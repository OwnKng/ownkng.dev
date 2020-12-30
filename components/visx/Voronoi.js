import React, { useState, useEffect, useMemo, useRef } from "react";
import { Group } from "@visx/group";
import { GradientTealBlue } from "@visx/gradient";
import { voronoi, VoronoiPolygon } from "@visx/voronoi";
import { GlyphTriangle, GlyphSquare } from "@visx/glyph";
import { motion } from "framer-motion";

const data = new Array(150).fill(null).map(() => ({
  x: Math.random(),
  y: Math.random(),
  id: Math.random().toString(36).slice(2),
}));

const defaultMargin = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const variants = {
  big: { stroke: "#fffffe", strokeWidth: 0.8 },
  small: { stroke: "#F1F4F7", strokeWidth: 0.2 },
};

const Voronoi = ({ width, height, margin = defaultMargin }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const voronoiLayout = useMemo(
    () =>
      voronoi({
        x: (d) => d.x * innerWidth,
        y: (d) => d.y * innerHeight,
        width: innerWidth,
        height: innerHeight,
      })(data),
    [innerWidth, innerHeight]
  );

  const polygons = voronoiLayout.polygons();
  const svgRef = useRef(null);

  return width < 10 ? null : (
    <svg width={width} height={height} ref={svgRef}>
      <GradientTealBlue id='voronoi_teal_blue' />
      <Group top={margin.top} left={margin.left} clipPath='url(#voronoi_clip)'>
        {polygons.map((polygon) => (
          <VoronoiPolygon key={`polygon-${polygon.data.id}`} polygon={polygon}>
            {({ polygon, path }) =>
              polygon.map((polygon) => (
                <motion.path
                  variants={variants}
                  initial='small'
                  animate='big'
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    repeatType: "reverse",
                  }}
                  d={path}
                  stroke='#FFFFFE'
                  fill={"url(#voronoi_teal_blue)"}
                />
              ))
            }
          </VoronoiPolygon>
        ))}
        {data.map(({ x, y, id }, i) => {
          if (i % 2 == 0) {
            return (
              <circle
                key={`circle-${id}`}
                r={2}
                cx={x * innerWidth}
                cy={y * innerHeight}
                fill={"#FFFFFE"}
                fillOpacity={0.8}
              />
            );
          } else if (i % 3 == 0) {
            return (
              <GlyphTriangle
                left={x * innerWidth}
                top={y * innerHeight}
                fill={"#FFFFFE"}
                size={15}
                fillOpacity={0.8}
              />
            );
          } else {
            return (
              <GlyphSquare
                left={x * innerWidth}
                top={y * innerHeight}
                fill={"#FFFFFE"}
                size={15}
                fillOpacity={0.8}
              />
            );
          }
        })}
      </Group>
    </svg>
  );
};

export default Voronoi;

/*

import { localPoint } from "@visx/event";

  const [hoveredId, setHoveredId] = useState(null);

const neighborRadius = 75;


  const [neighborIds, setNeighborIds] = useState(new Set());

onMouseMove={(event) => {
          if (!svgRef.current) return;

          // find the nearest polygon to the current mouse position
          const point = localPoint(svgRef.current, event);
          if (!point) return;

          const closest = voronoiLayout.find(point.x, point.y, neighborRadius);
          // find neighboring polygons to hightlight
          if (closest && closest.data.id !== hoveredId) {
            const neighbors = new Set();
            const cell = voronoiLayout.cells[closest.index];
            if (!cell) return;

            cell.halfedges.forEach((index) => {
              const edge = voronoiLayout.edges[index];
              const { left, right } = edge;
              if (left && left !== closest) neighbors.add(left.data.id);
              else if (right && right !== closest) neighbors.add(right.data.id);
            });

            setNeighborIds(neighbors);
            setHoveredId(closest.data.id);
          }
        }}
        onMouseLeave={() => {
          setHoveredId(null);
          setNeighborIds(new Set());
        }}


*/
