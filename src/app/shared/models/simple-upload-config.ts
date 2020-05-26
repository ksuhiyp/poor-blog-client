export interface SimpleUploadConfig {
  simpleUpload: { uploadUrl: string; fieldName: string; method: string };
  toolbar: { items: string[] };
  language: string;
  image: { toolbar: string[] };
  table: { contentToolbar: string[] };
  licenseKey: string;
}
