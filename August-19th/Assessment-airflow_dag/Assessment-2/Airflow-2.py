from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.exceptions import AirflowFailException
from datetime import datetime, timedelta
import json, os, logging


default_args = {
    'owner': 'audit_team',
    'email': ['anbushazam333@gmail.com'],
    'email_on_failure': True,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

def pull_data(**kwargs):
    sample = {'value': 85, 'timestamp': datetime.utcnow().isoformat()}
    logging.info(f"Pulled sample data: {sample}")
    return sample


def validate_data(**kwargs):
    ti = kwargs['ti']
    record = ti.xcom_pull(task_ids='pull_data')
    threshold = 100

    if record['value'] > threshold:
        msg = f"Value {record['value']} exceeds {threshold}"
        logging.error(msg)
        raise AirflowFailException(msg)
    else:
        msg = f"Value {record['value']} is within {threshold}"
        logging.info(msg)

    result = {'value': record['value'], 'status': 'OK', 'note': msg}
    os.makedirs('/tmp', exist_ok=True)
    with open('/tmp/audit_result.json', 'w') as f:
        json.dump(result, f)

def log_results():
    with open('/tmp/audit_result.json') as f:
        result = json.load(f)
    logging.info(f"Audit file contents: {result}")

with DAG(
    dag_id='data_audit_dag',
    default_args=default_args,
    start_date=datetime(2025, 1, 1),
    schedule='@hourly',
    catchup=False
) as dag:

    task_pull = PythonOperator(
        task_id='pull_data',
        python_callable=pull_data
    )


    task_validate = PythonOperator(
        task_id='validate_data',
        python_callable=validate_data
    )

    task_log = PythonOperator(
        task_id='log_results',
        python_callable=log_results
    )

    task_finalize = BashOperator(
        task_id='final_status',
        bash_command='echo "Audit completed at $(date)"'
    )

    task_pull >> task_validate >> task_log >> task_finalize
