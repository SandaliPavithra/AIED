import * as React from "react";
import Calendar from "@cloudscape-design/components/calendar";

export default () => {
  const [value, setValue] = React.useState("");
  return (
    <Calendar
      onChange={({ detail }) => setValue(detail.value)}
      value={value}
    />
  );
}