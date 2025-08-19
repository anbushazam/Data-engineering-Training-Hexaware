from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import os
from airflow.operators.bash import BashOperator

message_path="/tmp/airflow_message.txt"
def generate_message():
    message="This is a message from the first task."
    with open(message_path,"w")as f:
        f.write(message)
def read_message():
    if os.path.exists(message_path):
        with open(message_path,'r')as f:
            print(f"message from file: {f.read()}")
    else:
        raise FileNotFoundError(f"File {message_path} does not exist.")
with DAG(
    dag_id="chained_tasks_dag",
    start_date=datetime(2025,8,19),
    schedule=None,
    catchup=False,
    tags=["chain_example"]

)as dags:
    generate_task=PythonOperator(
        task_id="generate_message_task",
        python_callable=generate_message
    )
    simulate_save=BashOperator(
        task_id="simuate_file_confirmation",
        bash_command=f"echo 'message saved at {message_path}'"
    )
    read_task=PythonOperator(
        task_id="read_message_task",
        python_callable=read_message,
    )
    generate_task >> simulate_save >> read_task
