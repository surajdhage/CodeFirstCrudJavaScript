using codeFirstApproachData1.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace codeFirstApproachData1.Controllers
{
    public class HomeController : Controller
    {
        StudentContext db = new StudentContext();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetStudentList()
        {
            //List<Student> studentlist = db.Students.Where(x => x.IsDeleted == false).Select(x => new Student
            //{
            //    StudentId = x.StudentId,
            //    StudentName = x.StudentName,
            //    Email = x.Email,
            //}).ToList();
            List<Student> studentlist = db.Students.ToList();
            return Json(studentlist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStudentById(int StudentId)
        {
            Student model = db.Students.Where(x => x.StudentId == StudentId).SingleOrDefault();
            string value = string.Empty;
            value = JsonConvert.SerializeObject(model, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Json(value, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveDataInDatabase(Student model)
        {
            var result = false;
            try
            {
                if (model.StudentId > 0)
                {
                    Student Stu = db.Students.SingleOrDefault(x => x.IsDeleted == false && x.StudentId == model.StudentId);
                    Stu.StudentName = model.StudentName;
                    Stu.Email = model.Email;
                    db.SaveChanges();
                    result = true;
                }
                else
                {
                    Student Stu = new Student();
                    Stu.StudentName = model.StudentName;
                    Stu.Email = model.Email;
                    Stu.IsDeleted = false;
                    db.Students.Add(Stu);
                    db.SaveChanges();
                    result = true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteStudentRecord(int StudentId)
        {
            bool result = false;
            Student Stu = db.Students.SingleOrDefault(x => x.IsDeleted == false && x.StudentId == StudentId);
            if (Stu != null)
            {
                Stu.IsDeleted = true;
                db.SaveChanges();
                result = true;
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
       
    }
}