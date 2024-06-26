import photos from "../../assets/data/picture.json";
function PhotoGrid() {
  return (
    <div className="columns-3 gap-3 sm:columns-3 sm:gap-5 md:columns-4 lg:columns-4 [&>img:not(:first-child)]:mt-8">
      {photos.map((photo) => (
        <img key={photo.id} src={photo.src} alt="" className="rounded-md" />
      ))}
    </div>
  );
}

export default PhotoGrid;
