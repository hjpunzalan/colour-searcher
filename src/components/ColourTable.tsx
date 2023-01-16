import styled from 'styled-components';
import { ColourData } from '../lib/types';

interface Props {
  colours: ColourData[];
}

export const ColourTable: React.FC<Props> = ({ colours }) => {
  return (
    <Table style={{ width: '100%' }}>
      <thead>
        <tr>
          <td />
          <TableHeadLabel>Name</TableHeadLabel>
          <TableHeadLabel>Hex</TableHeadLabel>
          <TableHeadLabel>RGB</TableHeadLabel>
          <TableHeadLabel>HSL</TableHeadLabel>
        </tr>
      </thead>
      <tbody>
        {colours.map((c) => (
          <tr key={c.hex} style={{ marginBottom: '1rem' }}>
            <td>
              <ColourBox color={c.hex} />
            </td>
            <td>{c.color}</td>
            <td>{c.hex}</td>
            <td>{c.rgb}</td>
            <td>{c.hsl}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  min-width: 800px;
`;

const TableHeadLabel = styled.td`
  font-weight: bold;
`;

const ColourBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.color};
`;
