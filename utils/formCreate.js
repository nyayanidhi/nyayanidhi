export function UploadFormCreate(files, outputSection, user) {
  const sessionid = user.email + "_" + new Date().getTime();
  const formData = new FormData();

  formData.append("user_id", user.sub);
  formData.append("session_id", sessionid);
  formData.append("output_request", outputSection);
  formData.append("email_id", user.email);
  files.forEach((fileObject, index) => {
    formData.append(`file_type${index + 1}`, fileObject.option);
    formData.append(`file${index + 1}`, fileObject.file);
  });

  localStorage.setItem("session_id", sessionid);

  return formData;
}

export function ChooseFilesData(checked, apirObj, output) {
  const nonChecked = apirObj.filter(
    (apiFile) =>
      !checked.some(
        (checkedFile) =>
          checkedFile[0] === apiFile[0] && checkedFile[1] === apiFile[1]
      )
  );
  const body = {
    chosen_file_tuples: checked,
    unchosen_file_tuples: nonChecked,
    converse: false,
    session_id: localStorage.getItem("session_id"),
    output_type: output,
  };
  if (checked.length > 0) {
    body.converse = true;
    localStorage.setItem("converse", "true");
  } else {
    localStorage.setItem("converse", "false");
  }
  return body;
}
