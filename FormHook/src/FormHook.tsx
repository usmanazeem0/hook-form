import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phonenumbers: string[];
  phNumbers: {
    number: "";
  }[];
  age: number;
  dob: Date;
};

const FormHook = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phonenumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    reset,
  } = form;
  const { errors, isDirty, isValid } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const onSubmit = (data: FormValues) => {
    console.log("submit form", data);
  };

  //   get value method

  const handleGetValues = () => {
    console.log("get value", getValues("username"));
  };

  //   set value method

  const handleSetValues = () => {
    console.log(setValue("channel", "ali"));
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-control">
            <label htmlFor="username">User name</label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "enter user name",
                },
              })}
            />
            <p className="error">{errors.username?.message} </p>
          </div>

          {/* for email */}

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email format",
                },
                validate: (fieldValue) => {
                  return (
                    fieldValue !== "admin@gmail.com" ||
                    "enter a different email"
                  );
                },
              })}
            />
            <p className="error">{errors.email?.message} </p>
          </div>

          {/* for channel */}

          <div className="form-control">
            <label htmlFor="channel">Channel Name</label>
            <input
              type="text"
              id="channel"
              {...register("channel", {
                required: {
                  value: true,
                  message: "enter channel name",
                },
              })}
            />
            <p className="error">{errors.channel?.message} </p>
          </div>

          {/* form submit button */}

          {/* for nested object social accounts twitter */}

          <div className="form-control">
            <label htmlFor="twitter">Twitter profile</label>
            <input
              type="text"
              id="twitter"
              {...register("social.twitter", {
                required: {
                  value: true,
                  message: "enter twitter profile",
                },
              })}
            />
            <p className="error">{errors.social?.twitter?.message}</p>
          </div>

          {/* object for facebook profile */}

          <div className="form-control">
            <label htmlFor="facebook">FaceBook Profile</label>
            <input
              type="text"
              id="facebook"
              {...register("social.facebook", {
                required: {
                  value: true,
                  message: "enter facebook profile",
                },
              })}
            />
            <p className="error">{errors.social?.facebook?.message} </p>
          </div>

          {/* input as an array of string as primary number */}

          <div className="form-control">
            <label htmlFor="primary-number">primary Number</label>
            <input
              type="text"
              {...register("phonenumbers.0", {
                required: {
                  value: true,
                  message: "enter primary phone number",
                },
              })}
            />
            <p className="error">{errors.phonenumbers?.[0]?.message} </p>
          </div>

          {/* array of string for secondary number */}

          <div className="form-control">
            <label htmlFor="secondary-number">Secondary Number</label>
            <input
              type="text"
              id="secondary-number"
              {...register("phonenumbers.1", {
                required: {
                  value: true,
                  message: "enter secondary number",
                },
              })}
            />
            <p className="error">{errors.phonenumbers?.[1]?.message} </p>
          </div>

          {/* add dynamic array for this import useFieldArray */}

          <div className="form-control">
            <label>List of phone Numbers</label>
            <div>
              {fields.map((field, index) => {
                return (
                  <div className="form-control" key={field.id}>
                    <input
                      type="text"
                      {...register(`phNumbers.${index}.number` as const)}
                    />
                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}
              <button type="button" onClick={() => append({ number: "" })}>
                Add another number
              </button>
            </div>
          </div>

          {/* add numeric value */}

          <div className="form-control">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              {...register("age", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "enter age",
                },
              })}
            />
            <p className="error">{errors.age?.message} </p>
          </div>

          {/* add date value */}

          <div className="form-control">
            <label htmlFor="dob">Date Of Birth</label>
            <input
              type="date"
              id="dob"
              {...register("dob", {
                valueAsDate: true,
                required: {
                  value: true,
                  message: "enter date of birth",
                },
              })}
            />
          </div>

          {/* submit button */}

          <button type="submit" disabled={!isDirty || !isValid}>
            Submit
          </button>

          {/* get value method */}

          <button onClick={handleGetValues}>Get value</button>

          {/* set value method */}

          <button onClick={handleSetValues}>Set value</button>

          {/* reset form button */}

          <button type="button" onClick={() => reset()}>
            Reset form
          </button>
        </form>
      </div>
      <DevTool control={control} />
    </>
  );
};

export default FormHook;
