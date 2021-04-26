from flask import Flask, request,jsonify
from flask_cors import CORS,cross_origin
import sqlite3

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def home():
    return {'message':'Api is up and running!'}

@app.route('/login',methods=['POST'])
def login():
    conn = sqlite3.connect('oc.db')
    cur = conn.cursor()
    s_email = request.form['s_email']
    s_password = request.form['s_password']

    try:
        sql = """SELECT sid FROM student WHERE s_email=? AND s_password=?;"""
        values = (s_email,s_password)
        cur.execute(sql,values)
        row = cur.fetchone()
        if row==None:
            # return Response("{'error':'Check your credentials'}", status=404, mimetype='application/json')
            return jsonify({'error':'Check your credentials'}),404
        else:
            # return Response("{'success':'Login Succesfull'}", status=200, mimetype='application/json')
            return jsonify({'success':'Login Successful','sid':row[0]}),200

    except Exception as e:
        # return Response("{'error':'%s'}"%(e),  status=400, mimetype='application/json')
            return jsonify({'error': e}),400
    finally:
        conn.close()

@app.route('/register',methods=['POST'])
def register():
    conn = sqlite3.connect('oc.db')
    cur = conn.cursor()
    s_name = request.form['s_name']
    s_email = request.form['s_email']
    s_phone = request.form['s_phone']
    s_password = request.form['s_password']
    try:
        sql = """INSERT INTO student(s_name,s_email,s_phone,s_password) VALUES(?,?,?,?);"""
        values = (s_name,s_email,s_phone,s_password)
        cur.execute(sql,values)
        conn.commit()
        return jsonify({'success':'Registration Successful'}),201

    except Exception as e:
        return jsonify({'error':e}),404
    finally:
        conn.close()



@app.route('/who-is',methods=['GET'])
def who_is():
    conn = sqlite3.connect('oc.db')
    cur = conn.cursor()
    sid = request.args.get('sid')
    try:
        sql = """SELECT s_name FROM student WHERE sid=?;"""
        values = (sid,)
        cur.execute(sql,values)
        row = cur.fetchone()
        return jsonify({'s_name': row[0]}),200

    except Exception as e:
        return jsonify({'error':e}),404
    finally:
        conn.close()

@app.route('/forgot',methods=['POST'])
def forgot():
    return {'message':'Forgot'}

@app.route('/logout',methods=['POST'])
def logout():
    return {'message':'Logout'}

@app.route('/new-question',methods=['POST'])
def new_question():
    q_author_id = request.form['sid']
    q_title = request.form['q_title']
    q_content = request.form['q_content']

    conn = sqlite3.connect('oc.db')
    cur = conn.cursor()

    try:
        sql = """INSERT INTO question(q_author_id,q_title,q_content) VALUES(?,?,?);"""
        values = (q_author_id,q_title,q_content)
        cur.execute(sql,values)
        conn.commit()
        return jsonify({'success':'Posted new question successfully'}),201

    except Exception as e:
        return jsonify({'error':e}),404
    finally:
        conn.close()
        
@app.route('/list-questions',methods=['GET'])
def list_questions():
    conn = sqlite3.connect('oc.db')
    cur = conn.cursor()
    print("Hey baby")
    try:
        sql = """SELECT  A.q_title, A.q_content, B.s_name FROM question A INNER JOIN student B ON A.q_author_id=B.sid;"""
        cur.execute(sql)
        rows = cur.fetchall()
        list_of_questions = dict()

        for i,val in enumerate(rows):
            list_of_questions[i] = {"q_title":val[0],"q_content":val[1],"q_author_id":val[2]}

        return list_of_questions,200

    except Exception as e:
        return jsonify({'error':e}),404
    finally:
        conn.close()

if __name__=="__main__":
    app.run()