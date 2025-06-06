function swipe() {
  //console.log(vistesPartides)

  let paginaSeguent = 1;
  let paginaAnterior = 1;
  let vistaSeguent;
  let vistaAnterior;
  let paginaActual;
  let partidaActual;
  let vistaActual;
  let indexactual;
  let grupactual;

  var min_horizontal_move = 100;
  var max_vertical_move = 40;
  var within_ms = 1000;

  var start_xPos;
  var start_yPos;
  var start_time;

  function touch_start(event) {
    start_xPos = event.touches[0].pageX;
    start_yPos = event.touches[0].pageY;
    start_time = new Date();
  }

  function touch_end(event, funcio) {
    var end_xPos = event.changedTouches[0].pageX;
    var end_yPos = event.changedTouches[0].pageY;
    var end_time = new Date();
    let move_x = end_xPos - start_xPos;
    let move_y = end_yPos - start_yPos;
    let elapsed_time = end_time - start_time;

    //console.log(move_x,move_y,elapsed_time)

    if (
      Math.abs(move_x) > min_horizontal_move &&
      Math.abs(move_y) < max_vertical_move &&
      elapsed_time < within_ms
    ) {
      paginaActual = pageHistory[pageHistory.length - 1];
      partidaActual = partidesHistory[partidesHistory.length - 1];
      vistaActual = paginaActual[0];
      //console.log(paginaActual)

      if (vistaActual == "detall") {
        if (parseInt(paginaActual[1]) < dades.length) {
          paginaSeguent = (parseInt(paginaActual[1]) + 1).toString();
          if (parseInt(paginaActual[1]) == 1) {
            paginaAnterior = dades.length.toString();
          } else {
            paginaAnterior = (parseInt(paginaActual[1]) - 1).toString();
          }
        } else {
          paginaSeguent = "1";
          paginaAnterior = (parseInt(paginaActual[1]) - 1).toString();
        }
        vistaSeguent = vistaActual;
        vistaAnterior = vistaActual;
      } else if (vistaActual == "detallpartida") {
        console.log(vistaActual, partidaActual);

        indexactual = vistesPartides.indexOf(partidaActual[1]);

        if (indexactual < vistesPartides.length) {
          paginaSeguent = vistesPartides[indexactual + 1].toString();
          paginaAnterior = vistesPartides[indexactual - 1].toString();
          vistaSeguent = vistaActual;
          vistaAnterior = vistaActual;
        }
      } else if (vistaActual == "ronda") {
        grupactual = paginaActual[1]["grup"]
        console.log(grupactual)
        console.log(paginaActual[1])
        console.log(paginaActual[1]["ronda"])
        if (paginaActual[1]["ronda"] < rondes.length) {
          paginaSeguent = {ronda:parseInt(paginaActual[1]["ronda"]) + 1,grup:grupactual};
          if (paginaActual[1]["ronda"] == 1) {
            paginaAnterior = {ronda:rondes.length,grup:grupactual};
          } else {
            paginaAnterior = {ronda:parseInt(paginaActual[1]["ronda"]) - 1,grup:grupactual};
          }
        } else {
          paginaSeguent =  {ronda: 1,grup:grupactual};
          paginaAnterior = {ronda:parseInt(paginaActual[1]["ronda"]) - 1,grup:grupactual};
        }
        vistaSeguent = vistaActual;
        vistaAnterior = vistaActual;
      } else {
        indexactual = vistesGenerals.indexOf(vistaActual);
        console.log(indexactual);
        if (indexactual < vistesGenerals.length) {
          vistaSeguent = vistesGenerals[indexactual + 1];
          vistaAnterior = vistesGenerals[indexactual - 1];
          console.log(indexactual, vistaSeguent, vistaAnterior);
        }
      }
      console.log(vistesNoSwipe.includes(vistaActual));
      if (!vistesNoSwipe.includes(vistaActual)) {
        if (move_x < 0) {
          // Per a un gest de desplaçament cap a l'esquerra
          //console.log(vistaActual,paginaAnterior)
          resumSeguent(vistaSeguent, paginaSeguent);

          console.log(event);
        } else {
          // Per a un gest de desplaçament cap a la dreta
          //console.log(paginaActual)
          resumPrevi(vistaAnterior, paginaAnterior);
        }
      }
    }
  }

  var content = document.getElementById("swiper");
  content.addEventListener("touchstart", touch_start);
  content.addEventListener("touchend", touch_end);

  function resumSeguent(vista, index) {
    if (true) {
      content.classList = "desapareixesquerra";
      setTimeout(function () {
        content.classList = "apareixdreta";
        loadContent([vista, index]);
        if (vista == "detallpartida") {
          updatePartidaHistory([vista, index]);
          pageHistory.pop();
          updateHistory([vista, index]);
        } else {
          updateHistory([vista, index]);
        }
      }, 200);
    }
  }

  function resumPrevi(vista, index) {
    if (true) {
      content.classList = "desapareixdreta";
      setTimeout(function () {
        content.classList = "apareixesquerra";
        loadContent([vista, index]);
        if (vista == "detallpartida") {
          updatePartidaHistory([vista, index]);
          pageHistory.pop();
          updateHistory([vista, index]);
        } else {
          updateHistory([vista, index]);
        }
      }, 200);
    }
  }
}
