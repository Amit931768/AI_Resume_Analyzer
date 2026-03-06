from flask import Flask, render_template, request
import PyPDF2
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
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

    score = len(found_skills) * 10

    if score > 100:
        score = 100

    missing_skills = list(set(skills_db) - set(found_skills))

    return render_template(
        "index.html",
        score=score,
        found=found_skills,
        missing=missing_skills
    )


if __name__ == "__main__":
    app.run(debug=True)