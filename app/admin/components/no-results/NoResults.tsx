import { MdOutlineSearchOff } from "react-icons/md";
import './no-results.scss';

type Props = {
  title?: string;
  description?: string;
  colSpan?: number;
}

export default function NoResults({
  title = 'No results found',
  description = 'Try adjusting your search or checking another month.',
  colSpan = 6,
}: Props) {
  return (
    <tr className="no-results-row">
      <td colSpan={colSpan}>
        <div className="no-results">
          <span className="no-results-icon" aria-hidden="true">
            <MdOutlineSearchOff />
          </span>

          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </td>
    </tr>
  )
};
