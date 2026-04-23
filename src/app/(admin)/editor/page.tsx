"use client";

import TiptapEditor from "@/components/editor/TiptapEditor";
import Input from "@/components/form/Input";
import { usePostForm } from "@/hooks/usePostForm";
import { useState } from "react";
import CustomAlert from "@/components/alert/CustomAlert";

export default function Page() {
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

  const handleSubmit = async () => {
    try {
      await submit();

      setAlert({
        open: true,
        message: "Post created successfully",
        severity: "success",
      });
    } catch (err: any) {
      setAlert({
        open: true,
        message: err.message || "Something went wrong",
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
              Article Title
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

            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-4 focus-within:ring-emerald-200 focus-within:border-emerald-500 bg-white">
              <span className="px-4 py-3 bg-gray-50 text-gray-500 text-sm font-mono border-r">
                /news/
              </span>
              <input
                className="flex-1 px-4 py-3 outline-none text-gray-800 font-mono text-sm"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="example-title"
              />
            </div>
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
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center px-6 py-3 bg-emerald-700 text-white rounded-lg font-semibold text-sm shadow hover:bg-emerald-500 hover:-translate-y-0.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading && (
                <span className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Creating post..." : "Post Now"}
            </button>
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