import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

interface KeyValuePair {
  key: string;
  component: React.ReactNode;
}

interface KeyValueListProps {
  items: KeyValuePair[];
  minKeyCellWidht?: number;
  maxKeyCellWidht?: number;
}

const KeyValueList: React.FC<KeyValueListProps> = ({ items, minKeyCellWidht, maxKeyCellWidht }) => {
  const theme = useTheme();

  return (
    <div style={{display: "table", width: "100%", border: 0, borderCollapse: 'collapse'}}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: "table-row",
            borderBottom: index < items.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'    
          }}      
        >
          <Box display="table-cell" style={{ minWidth: `${minKeyCellWidht ? minKeyCellWidht : 50}px` , maxWidth: `${maxKeyCellWidht ? maxKeyCellWidht : 150}px`, overflowWrap: 'break-word' }} px={1} py={0.5}>
            <Typography variant="body1">{item.key}</Typography>
          </Box>
          <Box display="table-cell" px={1} py={0.5}>
            {item.component}
          </Box>
        </div>
      ))}
    </div>
  );
};

export default KeyValueList;
