export function uploadValidation(files, outputSection) {
  let isValid = true;
  let errorMessage = "";
  if (files.length === 0) {
    isValid = false;
    errorMessage = "Please upload at least one file";
  }
  for (let index = 0; index < files.length; index++) {
    let fileObject = files[index];
    if (fileObject.option === "" || fileObject.option === null) {
      isValid = false;
      errorMessage = `Please select an option for file ${index + 1}`;
    }
  }
  if (outputSection === "") {
    isValid = false;
    errorMessage = "Please select an output type";
  }

  return { isValid, errorMessage };
}
