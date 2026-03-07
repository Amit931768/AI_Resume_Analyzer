from flask import Flask, render_template, request
import PyPDF2
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

skills_db = [
"html","css","javascript","python","sql",
"react","node","java","c++","flask",
"django","mongodb","firebase","git"
]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():

    file = request.files["resume"]

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(filepath)

    text = ""

    with open(filepath, "rb") as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)

        for page in reader.pages:
            text += page.extract_text()

    text = text.lower()

    found_skills = []

    for skill in skills_db:
        if skill in text:
            found_skills.append(skill)

    score = int((len(found_skills) / len(skills_db)) * 100)

    missing_skills = list(set(skills_db) - set(found_skills))

    return render_template(
        "index.html",
        score=score,
        found=found_skills,
        missing=missing_skills
    )


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)