import { useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

let last_jump = new Object();
function NavBar({ setSideMenuIsOpen }) {
  const { translate } = useLanguage();

  function GoToSection(click) {
    if (click == undefined) {
      return;
    }
    let link = click.target;
    if (
      link == undefined ||
      link.tagName == undefined ||
      click.preventDefault == undefined ||
      link.href == undefined
    ) {
      return;
    }
    click.preventDefault();
    let lastOf = link.href.lastIndexOf("#");
    if (lastOf < 0) {
      return;
    }

    let target, top, scroller, section, header, parsed, margin, style;
    target = link.href.slice(lastOf + 1);
    scroller = document.getElementById("defaultLayout");
    section = document.getElementById(target);
    header = document.getElementById("header");

    style = getComputedStyle(section);
    margin = style.getPropertyValue("margin-top");
    parsed = parseInt(margin);
    if (isNaN(parsed)) {
      parsed = 0;
    }
    if (
      last_jump.link == link.href &&
      scroller.scrollTop == last_jump.position
    ) {
      return;
    }
    last_jump.link = link.href;
    last_jump.position = section.offsetTop - (header.offsetHeight + parsed);

    top = last_jump.position;
    scroller.scrollTo({ top: top, behavior: "smooth" });
  }
  useEffect(function () {
    let link, collected, button;
    collected = document.getElementsByClassName("link");
    for (link in collected) {
      if (isNaN(link)) {
        continue;
      }
      collected[link].addEventListener("click", GoToSection);
    }
    button = document.getElementById("reservationButton");
    button.addEventListener("click", GoToSection);
  });

  return (
    <ul className="flex xl:flex-row lg:flex-row flex-col lg:w-[20vw]  justify-between">
      <a href="#home" className="font-barlow text-lg link">
        {translate(`pages.home`)}
      </a>
      <a href="#menu" className="font-barlow text-lg link md:mt-0 mt-4">
        {translate(`pages.menu`)}
      </a>
      <a href="#blog" className="font-barlow text-lg link md:mt-0 mt-4">
        {translate(`pages.blog`)}
      </a>
      <a href="#review" className="font-barlow text-lg link md:mt-0 mt-4">
        {translate(`pages.review`)}
      </a>
    </ul>
  );
}

export default NavBar;
