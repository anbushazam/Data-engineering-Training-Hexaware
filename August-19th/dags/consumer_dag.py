from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def read_file():
    with open('/tmp/hello.txt', 'r') as f:
        content = f.read()
        print(f'File content: {content}')
with DAG(
    dag_id="consumer_dag",
    start_date=datetime(2025, 8, 19),
    schedule=None,
    catchup=False,
    tags=['example_consumer']
)as dag:
    read_task=PythonOperator(
        task_id="read_file_task",
        python_callable=read_file
    )