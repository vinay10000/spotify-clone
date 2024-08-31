"use client";
import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Please select an image and song file");
        return;
      }
      const uniqueId = uniqid();
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        toast.error("Something went wrong");
        return;
      }
      
      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueId}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });
        if (imageError) {
          setIsLoading(false);
          toast.error(imageError.message);
          return;
        }
        const {
            error: supabaseError
        } = await supabaseClient.from("songs").insert({
            title: values.title,
            author: values.author,
            song_path: songData.path,
            image_path: imageData.path,
            user_id: user.id
        })

        if (supabaseError) {
            setIsLoading(false);
            toast.error(supabaseError.message);
            return;
        }
        router.refresh();
        setIsLoading(false);
        toast.success("Song uploaded successfully");
        reset()
        uploadModal.onClose()
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      uploadModal.onClose();
    }
  };
  return (
    <Modal
      title="Add a song"
      description="Upload your songs"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-2">Select a Song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-2">Select an Image </div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
