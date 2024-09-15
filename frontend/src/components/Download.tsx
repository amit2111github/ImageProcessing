import { useImage } from '../context/imagecontext';
import { download } from '../helper/apicaller';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Download = () => {
  const { originalPath, manipulations } = useImage();
  const handleDownload = async (format: string) => {
    if (!originalPath) return;
    await download({ format, filePath: originalPath, ...manipulations });
  };
  const downloadFormat = ['png', 'jpeg'];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="'rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-gray-200">
        Download
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white rounded">
        {downloadFormat.map((format, index) => (
          <DropdownMenuItem
            onClick={() => handleDownload(format)}
            key={index}
            className="cursor-pointer"
          >
            {format}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Download;
