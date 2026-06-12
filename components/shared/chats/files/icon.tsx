import { FileUnknownOutlined, FileExcelOutlined, FileWordOutlined, FilePdfOutlined, FilePptOutlined, FileZipOutlined, FileImageOutlined } from '@ant-design/icons';

import { Attachment } from '@/types';

const FileIcon = ({ file }: { file: Attachment }) => {
  const Icon = {
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': FilePptOutlined,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileWordOutlined,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template': FileWordOutlined,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template': FileExcelOutlined,
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow': FilePptOutlined,
    'application/vnd.openxmlformats-officedocument.presentationml.template': FilePptOutlined,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileExcelOutlined,
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12': FilePptOutlined,
    'application/vnd.ms-powerpoint.slideshow.macroEnabled.12': FilePptOutlined,
    'application/vnd.ms-powerpoint.template.macroEnabled.12': FilePptOutlined,
    'application/vnd.ms-excel.template.macroEnabled.12': FileExcelOutlined,
    'application/vnd.ms-word.document.macroEnabled.12': FileWordOutlined,
    'application/vnd.ms-word.template.macroEnabled.12': FileWordOutlined,
    'application/vnd.ms-excel.sheet.macroEnabled.12': FileExcelOutlined,
    'application/vnd.ms-powerpoint': FilePptOutlined,
    'application/vnd.ms-excel': FileExcelOutlined,
    'application/msword': FileWordOutlined,
    'application/zip': FileZipOutlined,
    'application/pdf': FilePdfOutlined,
    'image/jpeg': FileImageOutlined,
    'image/jpg': FileImageOutlined,
    'image/png': FileImageOutlined,
  }[file.mime_type] || FileUnknownOutlined;

  return <Icon />;
};

export default FileIcon;