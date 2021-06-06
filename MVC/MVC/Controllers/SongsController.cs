using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MVC.Models;

namespace MVC.Controllers
{
    public class SongsController : Controller
    {
        private MusicDbContext db = new MusicDbContext();

        // GET: Songs
        public ActionResult Index()
        {
            if(Request.IsAjaxRequest())
                return PartialView("_SongsList", db.Songs.ToList());
            else
                return View(db.Songs.ToList());
        }

        // GET: Songs/Details/5
        //public ActionResult Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    SongModel songModel = db.Songs.Find(id);
        //    if (songModel == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(songModel);
        //}

        // GET: Songs/Create
        public ActionResult Create()
        {
            ViewBag.Genres = db.Genres.ToList();
            return View();
        }

        // POST: Songs/Create
        // Aby zapewnić ochronę przed atakami polegającymi na przesyłaniu dodatkowych danych, włącz określone właściwości, z którymi chcesz utworzyć powiązania.
        // Aby uzyskać więcej szczegółów, zobacz https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Artist,GenreId")] SongModel songModel)
        {
            if (ModelState.IsValid)
            {
                db.Songs.Add(songModel);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(songModel);
        }

        // GET: Songs/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SongModel songModel = db.Songs.Find(id);
            if (songModel == null)
            {
                return HttpNotFound();
            }

            ViewBag.Genres = db.Genres.ToList();
            return View(songModel);
        }

        // POST: Songs/Edit/5
        // Aby zapewnić ochronę przed atakami polegającymi na przesyłaniu dodatkowych danych, włącz określone właściwości, z którymi chcesz utworzyć powiązania.
        // Aby uzyskać więcej szczegółów, zobacz https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Artist,GenreId")] SongModel songModel)
        {
            if (ModelState.IsValid)
            {
                db.Entry(songModel).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(songModel);
        }

        //// GET: Songs/Delete/5
        //public ActionResult Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    SongModel songModel = db.Songs.Find(id);
        //    if (songModel == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(songModel);
        //}

        // DELETE: Songs/Delete/5
        [HttpDelete, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            SongModel songModel = db.Songs.Find(id);
            db.Songs.Remove(songModel);
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
