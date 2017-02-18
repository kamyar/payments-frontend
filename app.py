

import flask
from flask import render_template

# initiate app instance, and set template folder to here for index.html
app = flask.Flask(__name__, template_folder=".")

is_debug = True


@app.before_first_request
def build_webpack():
	# TODO: run webpack build or watch & build depending on webpack
	pass


@app.route('/')
def main_view():
	return render_template("index.html")

if __name__ == '__main__':
    app.run(port=8888, host='0.0.0.0', debug=is_debug)
    # TODO: kill webpack if it is in watch mode

