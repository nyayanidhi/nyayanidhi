"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/Protected";

function OutputPage(): JSX.Element {
  return (
    <ProtectedRoute>
      <Navbar />
      <div
        className="bg-slate-800 p-4 flex flex-col justify-between min-h-screen"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        <div
          className="min-h-screen bg-white p-6 rounded shadow-lg"
          style={{ minHeight: "calc(100vh - 100px)" }}
        >
          <div className="text-3xl font-semibold text-gray-800 mb-4">
            Your output is here
          </div>
          <div className="w-full flex justify-center mt-10 flex-col items-center gap-10">
            <span className="text-3xl">
              Your output of 4 files has been generated
            </span>
            <div className="flex flex-col gap-4">
              <Button>Download 1</Button>
              <Button>Download 2</Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default OutputPage;
