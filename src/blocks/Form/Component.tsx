"use client";
import type { Form as FormType } from "@payloadcms/plugin-form-builder/types";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { buildInitialFormState } from "./buildInitialFormState";
import { fields } from "./fields";
import { getClientSideURL } from "@/utilities/getURL";
import { Form } from "@/components/ui/form";
import { Applicant, User } from "@/payload-types";

export type Value = unknown;

export interface Property {
  [key: string]: Value;
}

export interface Data {
  [key: string]: Property | Property[];
}

export type FormBlockType = {
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: boolean;
  form: FormType;
  introContent?: SerializedEditorState;
  submission?: Applicant | null;
  user?: User | null;
};

export const FormBlock: React.FC<
  {
    id?: string;
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel,
    } = {},
    introContent,
    submission,
    user,
  } = props;

  const prefilledData = submission?.submissionData;

  let outputData = {};

  if (Array.isArray(prefilledData)) {
    outputData = prefilledData.reduce((acc, item) => {
      acc[item.field] = item.value;
      return acc;
    }, {});
  }

  const formMethods = useForm({
    // defaultValues: buildInitialFormState(formFromProps.fields)
    defaultValues: outputData,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<
    { message: string; status?: string } | undefined
  >();
  const router = useRouter();

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>;
      const submitForm = async () => {
        setError(undefined);

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }));

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        try {
          // const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          //   body: JSON.stringify({
          //     form: formID,
          //     submissionData: dataToSend,
          //   }),
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   method: 'POST',
          // })
          const req = await fetch(
            `${getClientSideURL()}/api/applicants/${submission?.id}`,
            {
              method: "PATCH",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend,
                attendee: user?.id,
              }),
            }
          );

          const res = await req.json();

          clearTimeout(loadingTimerID);

          if (req.status >= 400) {
            setIsLoading(false);

            setError({
              message: res.errors?.[0]?.message || "Internal Server Error",
              status: res.status,
            });

            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);

          if (confirmationType === "redirect" && redirect) {
            const { url } = redirect;

            const redirectUrl = url;

            if (redirectUrl) router.push(redirectUrl);
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({
            message: "Something went wrong.",
          });
        }
      };

      void submitForm();
    },
    [router, formID, redirect, confirmationType]
  );

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText
          className="mb-8 lg:mb-12"
          data={introContent}
          enableGutter={false}
        />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <Form {...formMethods}>
          <FormProvider {...formMethods}>
            {!isLoading && hasSubmitted && confirmationType === "message" && (
              <RichText data={confirmationMessage} />
            )}
            {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
            {error && (
              <div>{`${error.status || "500"}: ${error.message || ""}`}</div>
            )}
            {!hasSubmitted && (
              <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 last:mb-0">
                  {formFromProps &&
                    formFromProps.fields &&
                    formFromProps.fields?.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType];
                      if (Field) {
                        return (
                          <div className="mb-6 last:mb-0" key={index}>
                            <Field
                              form={formFromProps}
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>

                <Button form={formID} type="submit" variant="default">
                  {submitButtonLabel}
                </Button>
              </form>
            )}
          </FormProvider>
        </Form>
      </div>
    </div>
  );
};
