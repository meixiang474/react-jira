export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SeatchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SeatchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SeatchPanelProps) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </div>
      <select
        value={param.personId}
        onChange={(e) => {
          setParam({ ...param, personId: e.target.value });
        }}
      >
        <option value={""}>负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};
