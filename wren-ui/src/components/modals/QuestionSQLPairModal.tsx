import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Alert, Button, Form, Input, Modal, Typography } from 'antd';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import { ERROR_TEXTS } from '@/utils/error';
import { FORM_MODE } from '@/utils/enum';
import { ModalAction } from '@/hooks/useModalAction';
import SQLEditor from '@/components/editor/SQLEditor';
import { nextTick } from '@/utils/time';
import { parseGraphQLError } from '@/utils/errorHandler';
import ErrorCollapse from '@/components/ErrorCollapse';
import PreviewData from '@/components/dataPreview/PreviewData';
import { usePreviewSqlMutation } from '@/apollo/client/graphql/sql.generated';

type Props = ModalAction<any> & {
  loading?: boolean;
};

const StyledForm = styled(Form)`
  .adm-question-form-item > div > label {
    width: 100%;
  }
`;

const createQuestionValidator =
  (errorObj: any) => async (_rule: any, value: string) => {
    if (!value) {
      return Promise.reject(errorObj.REQUIRED);
    }

    if (value.trim() === '') {
      return Promise.reject(errorObj.REQUIRED);
    }

    if (value.length > 300) {
      return Promise.reject(errorObj.MAX_LENGTH);
    }

    return Promise.resolve();
  };

export default function QuestionSQLPairModal(props: Props) {
  const { defaultValue, formMode, loading, onClose, onSubmit, visible } = props;

  const isCreateMode = formMode === FORM_MODE.CREATE;

  const [form] = Form.useForm();
  const [error, setError] =
    useState<ReturnType<typeof parseGraphQLError>>(null);
  const [previewing, setPreviewing] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [generatingQuestion, setGeneratingQuestion] = useState<boolean>(false);

  const [previewSqlMutation, previewSqlResult] = usePreviewSqlMutation();

  const sqlValue = Form.useWatch('sql', form);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        question: defaultValue?.question,
        sql: defaultValue?.sql,
      });
    }
  }, [visible, defaultValue]);

  const handleReset = () => {
    previewSqlResult.reset();
    setError(null);
    form.resetFields();
  };

  const onValidateSQL = async () => {
    previewSqlResult.reset();
    await previewSqlMutation({
      variables: {
        data: {
          sql: sqlValue,
          limit: 1,
          dryRun: true,
        },
      },
    });
  };

  const handleError = (error) => {
    const graphQLError = parseGraphQLError(error);
    setError({ ...graphQLError, shortMessage: 'Invalid SQL Syntax' });
    console.error(graphQLError);
  };

  const onPreviewData = async () => {
    setError(null);
    setPreviewing(true);
    try {
      await onValidateSQL();
      await previewSqlMutation({
        variables: {
          data: {
            sql: sqlValue,
            limit: 50,
          },
        },
      });
    } catch (error) {
      handleError(error);
    } finally {
      setPreviewing(false);
    }
  };

  const onSubmitButton = () => {
    setError(null);
    setSubmitting(true);
    form
      .validateFields()
      .then(async (values) => {
        try {
          await onValidateSQL();
          await onSubmit({ ...values, id: defaultValue?.id });
          onClose();
        } catch (error) {
          handleError(error);
        } finally {
          setSubmitting(false);
        }
      })
      .catch(console.error);
  };

  const onGenerateQuestion = async () => {
    setGeneratingQuestion(true);
    // TODO: use real API
    await nextTick(5000);
    form.setFieldsValue({
      question: `${Math.floor(Math.random() * 100) + 1}__${form.getFieldValue('question')}`,
    });
    setGeneratingQuestion(false);
  };

  const confirmLoading = loading || submitting;
  const disabled = !sqlValue;

  const getIsCreateMode = () => {
    if (isCreateMode) {
      return true;
    }
    if (defaultValue?.responseId) {
      return true;
    }
    return false;
  };

  return (
    <Modal
      title={`${getIsCreateMode() ? 'Add' : 'Update'} Question-SQL Pair`}
      centered
      closable
      confirmLoading={confirmLoading}
      destroyOnClose
      maskClosable={false}
      onCancel={onClose}
      visible={visible}
      width={600}
      cancelButtonProps={{ disabled: confirmLoading }}
      okButtonProps={{ disabled: previewSqlResult.loading }}
      afterClose={() => handleReset()}
      footer={
        <div className="d-flex justify-space-between align-center">
          <div
            className="text-sm ml-2 d-flex justify-space-between align-center"
            style={{ width: 300 }}
          >
            <InfoCircleOutlined className="mr-2 text-sm gray-7" />
            <Typography.Text
              type="secondary"
              className="text-sm gray-7 text-left"
            >
              The SQL statement used here follows <b>Wren SQL</b>, which is
              based on ANSI SQL and optimized for Wren AI.{` `}
              <Typography.Link
                type="secondary"
                href="https://docs.getwren.ai/oss/guide/home/wren_sql"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more about the syntax.
              </Typography.Link>
            </Typography.Text>
          </div>
          <div>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              onClick={onSubmitButton}
              loading={confirmLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      }
    >
      <StyledForm form={form} preserve={false} layout="vertical">
        <Form.Item
          className="adm-question-form-item"
          label={
            <div
              className="d-flex justify-space-between"
              style={{ width: '100%' }}
            >
              <span>Question</span>
              <div className="gray-8 text-sm">
                How would AI describe this?
                <Button
                  className="ml-2"
                  size="small"
                  loading={generatingQuestion}
                  onClick={onGenerateQuestion}
                  disabled={disabled}
                >
                  <span className="text-sm">Generate question</span>
                </Button>
              </div>
            </div>
          }
          name="question"
          required
          rules={[
            {
              validator: createQuestionValidator(ERROR_TEXTS.SQL_PAIR.QUESTION),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="SQL Statement"
          name="sql"
          required
          rules={[
            {
              required: true,
              message: ERROR_TEXTS.SQL_PAIR.SQL.REQUIRED,
            },
          ]}
        >
          <SQLEditor autoFocus />
        </Form.Item>
      </StyledForm>
      <div className="my-3">
        <Typography.Text className="d-block gray-7 mb-2">
          Data preview (50 rows)
        </Typography.Text>
        <Button
          onClick={onPreviewData}
          loading={previewing}
          disabled={disabled}
        >
          Preview data
        </Button>
        {previewSqlResult?.data && (
          <div className="my-3">
            <PreviewData
              loading={previewing}
              previewData={previewSqlResult?.data?.previewSql}
            />
          </div>
        )}
      </div>
      {!!error && (
        <Alert
          showIcon
          type="error"
          message="Invalid SQL Syntax"
          description={<ErrorCollapse message={error.message} />}
        />
      )}
    </Modal>
  );
}
