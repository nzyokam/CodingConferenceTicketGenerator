import { cn } from "../../lib/utils";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 5,
    y: -5,
    opacity: 0.9,
  },
};

// const secondaryVariant = {
//   initial: {
//     opacity: 0,
//   },
//   animate: {
//     opacity: 1,
//   },
// };

const FileUpload = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    const validFiles = newFiles.filter((file) => {
      const isValidFile =
        ["image/jpeg", "image/png"].includes(file.type) &&
        file.size <= 500 * 1024;

      if (!isValidFile) {
        setFileError(
          "File too large or format incorrect (only PNG and JPG allowed)"
        );
        return false;
      }
      return true;
    });

    if (validFiles.length) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setFileError("");
      onChange && onChange(validFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, idx) => idx !== index);
    setFiles(updatedFiles);
    onChange && onChange(updatedFiles);
  };

  const handleReplaceFile = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div
      className="mt-10 sm:mt-4 xs:mt-4 ms:mt-4 sm:mb-4 xs:mb-4 ms:mb-4 mb-10"
      {...getRootProps()}
    >
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="flex justify-center group/file border border-dashed rounded-lg 
        cursor-pointer w-[500px] ms:w-[350px] xs:w-[280px] sm:w-[350px] 
        h-[160px] relative overflow-hidden"
      >
        <input
          {...getInputProps()}
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          className="hidden"
          required
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        />

        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full ">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  
                >
                  <div className="flex justify-center w-full items-center gap-4">
                    <motion.img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    
                  </div>

                 

                  <div className="m-2 flex space-x-2">
                    <button onClick={() => handleReplaceFile()} className="btt">
                      Change Image
                    </button>
                    <button onClick={() => handleRemoveFile(idx)} className="btt">
                      Remove Image
                    </button>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 back-upload flex items-center justify-center h-14 w-14 max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <img src="./icon-upload.svg" alt="Upload Icon" />
                  </motion.p>
                ) : (
                  <img src="./icon-upload.svg" alt="Upload Icon" />
                )}
              </motion.div>
            )}

          </div>
          {!files.length && (
            <p className="text-sm text-gray mt-4 sm:pr-10 sm:pl-10 xs:pr-5 xs:pl-5 ms:pr-10 ms:pl-10">
              Drag or drop your files here or click to upload
            </p>
          )}
        </div>
      </motion.div>
      {fileError ? (
        <div className="flex flex-row">
          <img
            src="./icon-info.svg"
            width={20}
            className="mr-2"
            alt="Info Icon"
          />
          <p className="text-[11px] text-red-500 mt-2 mb-2">{fileError}</p>
        </div>
      ) : (
        <div className="flex flex-row mt-2 mb-2">
          <img
            src="./icon-info.svg"
            width={20}
            className="mr-2"
            alt="Info Icon"
          />
          <p className="text-[11px] text-gray">
            Upload your photo (JPG or PNG, max size: 500KB)
          </p>
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FileUpload;
