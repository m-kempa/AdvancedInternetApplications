using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MVC.Models;
using WebApplication.Models;

namespace MVC.Controllers
{
    public class GenreController : Controller
    {
        private MusicDbContext db = new MusicDbContext();

        // GET: Genre
        public ActionResult Index()
        {
            if (Request.IsAjaxRequest())
                return PartialView("_GenreList", db.Genres.ToList());
            else
                return View(db.Genres.ToList());
        }

        // GET: Genre/Details/5
        //public ActionResult Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    GenreModel genreModel = db.Genres.Find(id);
        //    if (genreModel == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(genreModel);
        //}

        // GET: Genre/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Genre/Create
        // Aby zapewnić ochronę przed atakami polegającymi na przesyłaniu dodatkowych danych, włącz określone właściwości, z którymi chcesz utworzyć powiązania.
        // Aby uzyskać więcej szczegółów, zobacz https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name")] GenreModel genreModel)
        {
            if (ModelState.IsValid)
            {
                db.Genres.Add(genreModel);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(genreModel);
        }

        // GET: Genre/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            GenreModel genreModel = db.Genres.Find(id);
            if (genreModel == null)
            {
                return HttpNotFound();
            }
            return View(genreModel);
        }

        // POST: Genre/Edit/5
        // Aby zapewnić ochronę przed atakami polegającymi na przesyłaniu dodatkowych danych, włącz określone właściwości, z którymi chcesz utworzyć powiązania.
        // Aby uzyskać więcej szczegółów, zobacz https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name")] GenreModel genreModel)
        {
            if (ModelState.IsValid)
            {
                db.Entry(genreModel).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(genreModel);
        }

        // GET: Genre/Delete/5
        //public ActionResult Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    GenreModel genreModel = db.Genres.Find(id);
        //    if (genreModel == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(genreModel);
        //}

        // POST: Genre/Delete/5
        [HttpDelete, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            GenreModel genreModel = db.Genres.Find(id);
            db.Genres.Remove(genreModel);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
