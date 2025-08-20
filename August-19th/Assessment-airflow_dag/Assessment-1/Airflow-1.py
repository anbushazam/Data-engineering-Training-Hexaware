from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import os
from airflow.operators.bash import BashOperator
import pandas as pd

def creating_csv():
    csv_data="""name,age,city,phone
    John Doe,30,New York,1234567890
    Anbu,22,chennai,9876543210
    dhanu,22,coalcoast,1234567890"""
    with open("/tmp/sample_data.csv", "w") as f:
        f.write(csv_data)

    
def transformation():
    df = pd.read_csv("/tmp/sample_data.csv")

    if df is not None:
        df['name']= df['name'].str.lower()
        df['city']= df['city'].str.upper()
        print("Data transformation completed successfully.")
        print(df)
    else:
        raise ValueError("DataFrame is empty or not defined.")
with DAG(
    dag_id="csv_processing_dag",
    start_date=datetime(2025,8,19),
    schedule=None,
    catchup=False,
    tags=["csv_example"]
) as dags:
    create_csv_task = PythonOperator(
        task_id="create_csv_task",
        python_callable=creating_csv
    )
    

    simulate_save=BashOperator(
        task_id="simulate_file_confirmation",
        bash_command="echo 'CSV file created at /tmp/sample_data.csv'"
    )
    
    transform_data_task = PythonOperator(
        task_id="transform_data_task",
        python_callable=transformation
    )
    create_csv_task >> simulate_save >> transform_data_task




