import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { format, scaleThreshold } from "d3";
import { BASEMAP } from "@deck.gl/carto";
import styled from "styled-components";
import data from "../../../components/data/airPolution.json";

const StyledTooltip = styled.div`
  background: white;
  padding: 0.5rem;
  margin: 5px;
  font-size: 0.7rem;

  .road {
    font-weight: bold;
  }
`;

const StyledLegend = styled.div`
  background: white;
  padding: 0.8rem;
  margin: 0px auto;
  width: 90%;
  left: 5%;
  position: absolute;
  bottom: 20px;
  border-radius: 5px;
  font-size: 0.8rem;

  p {
    font-size: 0.8rem;
  }

  h3 {
    margin-top: 0px;
  }

  h4 {
    margin: 0px;
  }

  .legendKey {
    display: grid;
    grid-auto-flow: column;
  }

  .legendItem {
    display: grid;
    grid-auto-flow: column;
  }

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
`;

const breaks = [0, 20, 40, 60, 80, 100, 120, 140];

const COLOR_SCALE = scaleThreshold()
  .domain(breaks)
  .range([
    [252, 250, 192],
    [217, 239, 139],
    [255, 255, 191],
    [254, 224, 139],
    [253, 174, 97],
    [244, 109, 67],
    [215, 48, 39],
    [168, 0, 0],
    [103, 10, 32],
  ]);

const Legend = () => (
  <StyledLegend>
    <h3>Air quality in central London</h3>
    <p>
      This interactive map shows the mean levels of nitrogen dioxide in streets
      in central London, collected by two Google Street View cars between 2018
      and 2019. The Air Quality Standards Regulations 2010 require that the
      annual mean concentration of NO2 must not exceed 40 µg/m3. The data is
      available to download{" "}
      <a href='https://data.london.gov.uk/dataset/breathe-london-mobile-monitoring'>
        here
      </a>
      .
    </p>
    <h4>Nitrogen dioxide (µg/m3)</h4>
    <div className='legendKey'>
      {breaks.map((x) => (
        <div
          style={{
            width: "100%",
            height: 10,
            background: `rgb(${COLOR_SCALE(x).toString()})`,
          }}
        ></div>
      ))}
    </div>
    <div className='legendItem'>
      {breaks.map((x) => (
        <div
          style={{
            width: "100%",
          }}
        >
          {x}
        </div>
      ))}
    </div>
  </StyledLegend>
);

const renderToolTip = ({ hoverInfo }) => {
  const { object, x, y } = hoverInfo;

  if (!object) return null;

  return (
    <StyledTooltip style={{ position: "absolute", left: x, top: y }}>
      <div className='road'>
        {object.properties.name ? object.properties.name : <>Unknown road</>}
      </div>
      <div className='measurement'>
        {`${format(".2r")(object.properties.no2_ugm3)}µg/m3`}
      </div>
    </StyledTooltip>
  );
};

const AirPolution = () => {
  const [hoverInfo, setHoverInfo] = useState({});

  const INITIAL_VIEW_STATE = {
    longitude: -0.12,
    latitude: 51.5,
    zoom: 13,
    pitch: 40,
    bearing: 10,
  };

  const layer = new GeoJsonLayer({
    id: "geojson-layer",
    data,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    lineWidthScale: 5,
    lineWidthMinPixels: 2,
    onHover: setHoverInfo,
    getLineColor: (d) => COLOR_SCALE(d.properties.no2_ugm3),
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layer}
      pickingRadius={5}
    >
      <StaticMap attributionControl={false} mapStyle={BASEMAP.POSITRON} />
      {renderToolTip({ hoverInfo })}
      {<Legend />}
    </DeckGL>
  );
};

export default AirPolution;
