from flask import Flask
from flask_cors import CORS
from os import getenv
from dotenv import load_dotenv
import json

load_dotenv()

app = Flask(__name__)

#MySQL Config
MYSQL_USER = getenv("MYSQL_USER")
MYSQL_PASSWORD = getenv("MYSQL_PASSWORD")
MYSQL_HOSTNAME = getenv("MYSQL_HOSTNAME")
MYSQL_PORT = getenv("MYSQL_PORT")
MYSQL_DATABASE = getenv("MYSQL_DATABASE")

DATABASE_URL = getenv("DATABASE_URL")
print(f"DATABASE_URL: {DATABASE_URL}")

app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOSTNAME}:{MYSQL_PORT}/{MYSQL_DATABASE}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app)

