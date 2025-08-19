from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils import timezone
from datetime import timedelta, datetime
import requests

def print_welcome():
    print('Welcome to Airflow!')

def print_date():
    print(f'Today is {datetime.today().date()}')



with DAG(
    'welcome_dag',
    start_date=timezone.utcnow() - timedelta(days=1),
    schedule='0 23 * * *',
    catchup=False
) as dag:

    print_welcome_task = PythonOperator(
        task_id='print_welcome',
        python_callable=print_welcome
    )

    print_date_task = PythonOperator(
        task_id='print_date',
        python_callable=print_date
    )

   

    print_welcome_task >> print_date_task 