"use client";

import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Error } from "@/components/form/error";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { useAppSelector } from "@/lib/hooks";
import {
  Difficulties,
  Difficulty,
  Problem,
  ProblemService,
} from "@/lib/problem";
import { selectUser } from "@/lib/states/auth";
import { CheckIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

export const AdminProblemForm: React.FC<{
  problem?: Problem;
  onSubmit: (
    problem: Omit<Problem, "utcCreated" | "utcLastModified">
  ) => Promise<void>;
}> = ({ problem, onSubmit }) => {
  const user = useAppSelector(selectUser);
  const [error, setError] = useState<string>();
  return (
    <Formik
      initialValues={{
        title: problem?.title ?? "",
        description: problem?.description ?? "",
        timeLimit: problem?.timeLimit ?? 1000,
        memoryLimit: problem?.memoryLimit ?? 512,
        inputDescription: problem?.inputDescription ?? "",
        outputDescription: problem?.outputDescription ?? "",
        examples: !!problem
          ? ProblemService.decodeExamples(problem.examples)
          : [{ input: "", output: "" }],
        problemSource: problem?.problemSource ?? "",
        difficulty: problem?.difficulty ?? "1",
        tip: problem?.tip ?? "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("题目名称不能为空"),
        description: Yup.string().required("题目描述不能为空"),
        timeLimit: Yup.number()
          .required("时间限制不能为空")
          .min(1000, "时间限制不能小于1000毫秒"),
        memoryLimit: Yup.number()
          .required("内存限制不能为空")
          .min(64, "内存限制不能小于64MB")
          .max(1024, "内存限制不能大于1024MB"),
        inputDescription: Yup.string().required("输入格式不能为空"),
        outputDescription: Yup.string().required("输出格式不能为空"),
        examples: Yup.array(
          Yup.object({
            input: Yup.string().required("样例输入不能为空"),
            output: Yup.string().required("样例输出不能为空"),
          })
        ).min(1, "样例数据不能为空"),
        problemSource: Yup.string(),
        difficulty: Yup.string().equals(Object.keys(Difficulties)),
        tip: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit({
          id: problem?.id,
          title: values.title,
          author: "CCF",
          createdByUser: user?.uuid ?? "anonymous",
          description: values.description,
          timeLimit: values.timeLimit,
          memoryLimit: values.memoryLimit,
          stackLimit: values.memoryLimit,
          inputDescription: values.inputDescription,
          outputDescription: values.outputDescription,
          examples: ProblemService.encodeExamples(values.examples),
          problemSource: values.problemSource,
          difficulty: values.difficulty as Difficulty,
          tip: values.tip,
          status: "PUBLIC",
          score: 100,
        })
          .catch(setError)
          .finally(() => setSubmitting(false));
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form>
          <div className="space-y-4">
            <Field
              component={Input}
              name="title"
              type="text"
              label="题目名称"
            />
            <div className="grid grid-cols-3 gap-x-4">
              <Field
                component={Input}
                name="timeLimit"
                type="number"
                label="运行时间限制"
              />
              <Field
                component={Input}
                name="memoryLimit"
                type="number"
                label="内存空间限制"
              />
              <Field component={Select} name="difficulty" label="难度">
                {(Object.keys(Difficulties) as Difficulty[]).map((value) => (
                  <option key={value} value={value}>
                    （{Difficulties[value].colorText}）
                    {Difficulties[value].labelText}
                  </option>
                ))}
              </Field>
            </div>
            <Field
              component={Textarea}
              name="description"
              type="text"
              label="题目描述"
              large
              markdown
            />
            <Field
              component={Textarea}
              name="inputDescription"
              type="text"
              label="输入格式"
              markdown
            />
            <Field
              component={Textarea}
              name="outputDescription"
              type="text"
              label="输出格式"
              markdown
            />
            <FieldArray name="examples">
              {(helpers) => (
                <div>
                  <label>样例数据</label>
                  <Card>
                    {values.examples.map((_, index) => (
                      <React.Fragment key={index}>
                        <div className="grid grid-cols-2 gap-x-4">
                          <Field
                            component={Textarea}
                            name={`examples[${index}].input`}
                            label={`样例${index + 1}输入`}
                            monospace
                          />
                          <Field
                            component={Textarea}
                            name={`examples[${index}].output`}
                            label={`样例${index + 1}输出`}
                            monospace
                          />
                        </div>
                        <hr className="my-4" />
                      </React.Fragment>
                    ))}
                    <div className="grid grid-cols-2 gap-x-4">
                      <Button
                        type="success"
                        size="sm"
                        icon={PlusIcon}
                        onClick={() => {
                          helpers.push({ input: "", output: "" });
                        }}
                      >
                        增加样例
                      </Button>
                      <Button
                        type="danger"
                        size="sm"
                        icon={TrashIcon}
                        disabled={values.examples.length <= 1}
                        onClick={() => {
                          helpers.pop();
                        }}
                      >
                        删除最后一组样例
                      </Button>
                    </div>
                  </Card>
                  {typeof errors.examples === "string" && (
                    <Error name="examples" />
                  )}
                </div>
              )}
            </FieldArray>
            <Field
              component={Textarea}
              name="tip"
              type="text"
              label="提示"
              markdown
            />
            <Field
              component={Input}
              name="problemSource"
              type="text"
              label="题目来源"
            />
          </div>
          <hr className="my-4" />
          <div>
            <Button
              htmlType="submit"
              type="success"
              icon={CheckIcon}
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {!!problem ? "修改题目" : "创建题目"}
            </Button>
          </div>
          {error && (
            <Alert
              type="error"
              title={!!problem ? "修改题目失败" : "创建题目失败"}
            >
              <p>{String(error)}</p>
            </Alert>
          )}
        </Form>
      )}
    </Formik>
  );
};
