
import subprocess

import flask
from flask import render_template

# initiate app instance, and set template folder to here for index.html
app = flask.Flask(__name__, template_folder=".")

is_debug = True


@app.route('/')
def main_view():
    return render_template("index.html")

if __name__ == '__main__':
    print "Webpack proc starting"
    webpack_proc = subprocess.Popen(["webpack", "--progress", "--watch"])
    app.run(port=8888, host='0.0.0.0', debug=is_debug)
    print "Webpack proc terminating"
    webpack_proc.terminate()
    print webpack_proc.wait()
    print "Webpack proc terminated"

