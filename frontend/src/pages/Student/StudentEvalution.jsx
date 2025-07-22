import * as React from "react";
import DatePicker from "@cloudscape-design/components/date-picker";
import FormField from "@cloudscape-design/components/form-field";

export default () => {
  const [value, setValue] = React.useState("");
  return (
    <FormField
      label="Certificate expiry"
      constraintText="Use YYYY/MM/DD format."
    >
      <DatePicker
        onChange={({ detail }) => setValue(detail.value)}
        value={value}
        openCalendarAriaLabel={selectedDate =>
          "Choose certificate expiry date" +
          (selectedDate
            ? `, selected date is ${selectedDate}`
            : "")
        }
        placeholder="YYYY/MM/DD"
      />
    </FormField>
  );
}