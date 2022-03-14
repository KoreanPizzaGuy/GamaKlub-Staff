import { Table } from "react-bootstrap";
import { Check2, Check2Circle } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import PollDateTime from "./PollDateTime";
import { Choice, PollFromDB, Vote } from "../../models/poll";
import { slotCheckClassName, isChoiceIfNeedBe } from "../../helpers";

dayjs.extend(localizedFormat);

const PollTable = (props: {
  pollFromDB: PollFromDB;
  sortedChoices: Choice[];
}): JSX.Element => {
  const { pollFromDB, sortedChoices } = props;
  return (
    <div className="poll-info-div">
      <Table responsive className="poll-table">
        <thead>
          <tr className="poll-table-top-row">
            <th className="participant-cell"> </th>
            {sortedChoices.map((choice) => (
              <th
                key={choice.start}
                className={
                  choice.start === pollFromDB.finalChoice?.start &&
                  choice.end === pollFromDB.finalChoice?.end
                    ? "slot-time slot-final-choice"
                    : "slot-time"
                }
              >
                <PollDateTime choice={choice} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pollFromDB.votes?.map((vote: Vote, idx: number) => (
            <tr key={`${idx}-${vote.name}`}>
              <td className="poll-table-participants">{vote.name}</td>
              {sortedChoices.map((choice: Choice) => (
                <td
                  key={choice.start}
                  className={slotCheckClassName(choice, vote.choices)}
                >
                  {isChoiceIfNeedBe(choice, vote.choices) ? (
                    <Check2Circle className="slot-check" />
                  ) : (
                    <Check2 className="slot-check" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PollTable;
