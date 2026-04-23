"use client";

import TiptapEditor from "@/components/editor/TiptapEditor";
import Input from "@/components/form/Input";
import { usePostForm } from "@/hooks/usePostForm";
import { useState } from "react";
import CustomAlert from "@/components/alert/CustomAlert";
import { useRouter } from 'next/navigation'
import Button from "@/components/form/Button";
import { useSlugAvailability } from "@/hooks/useSlugAvailability";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const router = useRouter()
  const {
    title,
    slug,
    content,
    loading,
    setSlug,
    setContent,
    handleTitleChange,
    submit,
    fieldError,
  } = usePostForm();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const { available, loading: checkingSlug } = useSlugAvailability(slug);

  const handleSubmit = async () => {
    try {
      await submit();

      setAlert({
        open: true,
        message: "Post created successfully",
        severity: "success",
      });

      setTimeout(() => {
        router.push(`/news/${slug}`)
      }, 1200)

    } catch (err: unknown) {
      setAlert({
        open: true,
        message: (err as Error).message || "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-5 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-emerald-700">
            Write a New Post
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col gap-8">
          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-emerald-700 mb-2 block">
              Title of the post
            </label>
            <Input
              value={title}
              onChange={handleTitleChange}
              placeholder="Type an engaging title..."
              isLarge
            />
            {fieldError.title && (
              <p className="text-red-500 text-sm mt-1">{fieldError.title}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="text-sm font-semibold text-emerald-700 mb-2 block">
              URL Slug
            </label>

            <div
              className={` relative flex items-center rounded-lg overflow-hidden bg-white
                ${slug
                  ? available === true
                    ? "border border-green-400"
                    : available === false
                      ? "border border-red-400"
                      : "border border-gray-200"
                  : "border border-gray-200"
                }
              focus-within:ring-4 focus-within:ring-emerald-200
              focus-within:border-emerald-500
            `}>
              {/* prefix */}
              <span className="px-4 py-3 bg-gray-50 text-gray-500 text-sm font-mono border-r">
                /news/
              </span>

              {/* input */}
              <input
                className="flex-1 px-4 py-3 pr-10 outline-none text-gray-800 font-mono text-sm"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="example-title"/>

              {/* status icon */}
              {slug && (
                <div className="absolute right-3 flex items-center">
                  {checkingSlug && (
                    <span className="w-4 h-4 border-2 border-gray-300 border-t-emerald-500 rounded-full animate-spin" />
                  )}

                  {!checkingSlug && available === true && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-500 text-[14px] transition-transform scale-110"
                    />
                  )}

                  {!checkingSlug && available === false && (
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-red-500 text-[14px] transition-transform scale-110"
                    />
                  )}
                </div>
              )}
            </div>

            {/* error */}
            {fieldError.slug && (
              <p className="text-red-500 text-sm mt-1">{fieldError.slug}</p>
            )}
          </div>

          {/* Editor */}
          <div>
            <label className="text-sm font-semibold text-emerald-700 mb-2 block">
              Content Body
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <TiptapEditor value={content} onChange={setContent} />
            </div>
            {fieldError.content && (
              <p className="text-red-500 text-sm mt-1">{fieldError.content}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center px-6 py-3 bg-emerald-700 text-white rounded-lg font-semibold text-sm shadow hover:bg-emerald-500 hover:-translate-y-0.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading && (
                <span className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Creating post..." : "Post Now"}
            </Button>
          </div>
        </div>
      </div>

      {/* Alert */}
      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </div>
  );
}