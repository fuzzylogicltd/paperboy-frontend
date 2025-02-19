import { Form } from "radix-ui";
import styles from "./TextField.module.css";

interface TextInputProps {
  fieldName: string;
  labelText: string;
  isRequired?: boolean;
  fieldType?: string;
}

const TextField: React.FC<TextInputProps> = ({
  fieldName,
  labelText,
  isRequired = false,
  fieldType = "text",
}) => {
  return (
    <Form.Field name={fieldName}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Form.Label>{labelText}</Form.Label>
        <Form.Message className={styles.Message} match="valueMissing">
          Please enter your {labelText.toLowerCase()}
        </Form.Message>
        <Form.Message className={styles.Message} match="typeMismatch">
          Please provide a valid {labelText.toLowerCase()}
        </Form.Message>
      </div>

      <Form.Control asChild>
        <input
          className={styles.Input}
          type={fieldType}
          required={isRequired}
        />
      </Form.Control>
    </Form.Field>
  );
};

export default TextField;
