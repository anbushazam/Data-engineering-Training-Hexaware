from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def write_file():
    with open('/tmp/hello.txt', 'w') as f:
        f.write('Hello, Airflow!')
with DAG(
    dag_id="producer_dag",
    start_date=datetime(2025,8,19),
    schedule=None,
    catchup=False,
    tags=['example']
)as dag:
    write_task=PythonOperator(
        task_id='write_file_task',
        python_callable=write_file
    )