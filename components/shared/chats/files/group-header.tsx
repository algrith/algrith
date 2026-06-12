import { FilesGroupHeaderProps } from '@/types';

const GroupHeader = (props: FilesGroupHeaderProps) => {
  const { hasMultipleGroups, pluralize, groupType } = props;
  if (!hasMultipleGroups) return null;
  
  const header = {
    document: 'Document',
    video: 'Video',
    image: 'Image'
  }[groupType];

  return (
    <h6>{header}{pluralize ? 's' : ''}</h6>
  );
};

export default GroupHeader;