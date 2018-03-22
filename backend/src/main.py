# coding=utf-8

from flask_cors import CORS
from flask import Flask, jsonify, request

from entities.entity import Session, engine, Base
from entities.exam import Exam, ExamSchema
from auth import AuthError, requires_auth, requires_role

# creating the Flask application
app = Flask(__name__)
CORS(app)

# if needed, generate database schema
Base.metadata.create_all(engine)


@app.route('/exams')
def get_exams():
    # fetching from the database
    session = Session()
    exam_objects = session.query(Exam).all()

    # transforming into JSON-serializable objects
    schema = ExamSchema(many=True)
    exams = schema.dump(exam_objects)

    # serializing as JSON
    session.close()
    return jsonify(exams.data)


@app.route('/exams', methods=['POST'])
@requires_auth
def add_exam():
    # mount exam object
    posted_exam = ExamSchema(only=('title', 'description')) \
        .load(request.get_json())

    exam = Exam(**posted_exam.data, created_by="HTTP post request")

    # persist exam
    session = Session()
    session.add(exam)
    session.commit()

    # return created exam
    new_exam = ExamSchema().dump(exam).data
    session.close()
    return jsonify(new_exam), 201


@app.route('/exams/<examId>', methods=['DELETE'])
@requires_role('admin')
def delete_exam(examId):
    session = Session()
    exam = session.query(Exam).filter_by(id=examId).first()
    session.delete(exam)
    session.commit()
    session.close()
    return '', 201


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='Development Server Help')
    parser.add_argument("-d", "--debug", action="store_true", dest="debug_mode",
                        help="run in debug mode (for use with PyCharm)", default=False)
    parser.add_argument("-p", "--port", dest="port",
                        help="port of server (default:%(default)s)", type=int, default=5000)

    cmd_args = parser.parse_args()
    app_options = {"port": cmd_args.port}

    if cmd_args.debug_mode:
        app_options["debug"] = True
        app_options["use_debugger"] = False
        app_options["use_reloader"] = False

    app.run(**app_options)
