import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Sliders, CheckCircle2, AlertTriangle, Crosshair, Tag } from 'lucide-react';

interface DentalXRayViewerProps {
  selectedTooth?: number | null;
  onSelectTooth?: (toothNumber: number) => void;
  showAIOverlays?: boolean;
  onToggleAIOverlays?: () => void;
  interactive?: boolean;
  activeFindings?: {
    toothNumber: number;
    title: string;
    confidence: number;
    severity: string;
    color?: string;
  }[];
  onFindingClick?: (toothNumber: number) => void;
  readOnly?: boolean;
}

// Full 32 Adult Teeth coordinate map for Panoramic Radiograph SVG
// Upper Arch: 1 to 16 (Right to Left in dental charting convention)
// Lower Arch: 32 down to 17 (Right to Left)
export const TEETH_MAP: { [num: number]: { num: number; name: string; x: number; y: number; arch: 'upper' | 'lower'; quadrant: number } } = {
  // Upper Right (Q1)
  1: { num: 1, name: 'Upper Right 3rd Molar (Wisdom)', x: 65, y: 135, arch: 'upper', quadrant: 1 },
  2: { num: 2, name: 'Upper Right 2nd Molar', x: 105, y: 140, arch: 'upper', quadrant: 1 },
  3: { num: 3, name: 'Upper Right 1st Molar', x: 148, y: 148, arch: 'upper', quadrant: 1 },
  4: { num: 4, name: 'Upper Right 2nd Premolar', x: 190, y: 154, arch: 'upper', quadrant: 1 },
  5: { num: 5, name: 'Upper Right 1st Premolar', x: 230, y: 160, arch: 'upper', quadrant: 1 },
  6: { num: 6, name: 'Upper Right Canine (Eye tooth)', x: 272, y: 168, arch: 'upper', quadrant: 1 },
  7: { num: 7, name: 'Upper Right Lateral Incisor', x: 312, y: 174, arch: 'upper', quadrant: 1 },
  8: { num: 8, name: 'Upper Right Central Incisor', x: 355, y: 178, arch: 'upper', quadrant: 1 },
  // Upper Left (Q2)
  9: { num: 9, name: 'Upper Left Central Incisor', x: 405, y: 178, arch: 'upper', quadrant: 2 },
  10: { num: 10, name: 'Upper Left Lateral Incisor', x: 448, y: 174, arch: 'upper', quadrant: 2 },
  11: { num: 11, name: 'Upper Left Canine', x: 488, y: 168, arch: 'upper', quadrant: 2 },
  12: { num: 12, name: 'Upper Left 1st Premolar', x: 530, y: 160, arch: 'upper', quadrant: 2 },
  13: { num: 13, name: 'Upper Left 2nd Premolar', x: 570, y: 154, arch: 'upper', quadrant: 2 },
  14: { num: 14, name: 'Upper Left 1st Molar', x: 612, y: 148, arch: 'upper', quadrant: 2 },
  15: { num: 15, name: 'Upper Left 2nd Molar', x: 655, y: 140, arch: 'upper', quadrant: 2 },
  16: { num: 16, name: 'Upper Left 3rd Molar (Wisdom)', x: 695, y: 135, arch: 'upper', quadrant: 2 },
  // Lower Left (Q3)
  17: { num: 17, name: 'Lower Left 3rd Molar (Wisdom)', x: 695, y: 285, arch: 'lower', quadrant: 3 },
  18: { num: 18, name: 'Lower Left 2nd Molar', x: 655, y: 280, arch: 'lower', quadrant: 3 },
  19: { num: 19, name: 'Lower Left 1st Molar', x: 612, y: 272, arch: 'lower', quadrant: 3 },
  20: { num: 20, name: 'Lower Left 2nd Premolar', x: 570, y: 265, arch: 'lower', quadrant: 3 },
  21: { num: 21, name: 'Lower Left 1st Premolar', x: 530, y: 258, arch: 'lower', quadrant: 3 },
  22: { num: 22, name: 'Lower Left Canine', x: 488, y: 250, arch: 'lower', quadrant: 3 },
  23: { num: 23, name: 'Lower Left Lateral Incisor', x: 448, y: 244, arch: 'lower', quadrant: 3 },
  24: { num: 24, name: 'Lower Left Central Incisor', x: 405, y: 240, arch: 'lower', quadrant: 3 },
  // Lower Right (Q4)
  25: { num: 25, name: 'Lower Right Central Incisor', x: 355, y: 240, arch: 'lower', quadrant: 4 },
  26: { num: 26, name: 'Lower Right Lateral Incisor', x: 312, y: 244, arch: 'lower', quadrant: 4 },
  27: { num: 27, name: 'Lower Right Canine', x: 272, y: 250, arch: 'lower', quadrant: 4 },
  28: { num: 28, name: 'Lower Right 1st Premolar', x: 230, y: 258, arch: 'lower', quadrant: 4 },
  29: { num: 29, name: 'Lower Right 2nd Premolar', x: 190, y: 265, arch: 'lower', quadrant: 4 },
  30: { num: 30, name: 'Lower Right 1st Molar', x: 148, y: 272, arch: 'lower', quadrant: 4 },
  31: { num: 31, name: 'Lower Right 2nd Molar', x: 105, y: 280, arch: 'lower', quadrant: 4 },
  32: { num: 32, name: 'Lower Right 3rd Molar (Impacted)', x: 65, y: 285, arch: 'lower', quadrant: 4 },
};

export const DentalXRayViewer: React.FC<DentalXRayViewerProps> = ({
  selectedTooth = null,
  onSelectTooth,
  showAIOverlays = true,
  onToggleAIOverlays,
  interactive = true,
  activeFindings = [
    { toothNumber: 19, title: 'Deep Occlusal Caries & Periapical Radiolucency', confidence: 94.8, severity: 'Severe', color: '#D9534F' },
    { toothNumber: 30, title: 'Periodontal Bone Loss (3.8mm)', confidence: 89.1, severity: 'Moderate', color: '#E2A23B' },
    { toothNumber: 32, title: 'Mesioangular Impaction', confidence: 96.4, severity: 'Moderate', color: '#22A6C0' },
    { toothNumber: 14, title: 'Defective Restoration Overhang', confidence: 76.2, severity: 'Mild', color: '#8F9AA0' },
  ],
  onFindingClick,
  readOnly = false,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(115);
  const [invert, setInvert] = useState<boolean>(false);
  const [activeAnnotationMode, setActiveAnnotationMode] = useState<'none' | 'box' | 'measure' | 'label'>('none');
  const [localOverlayVisible, setLocalOverlayVisible] = useState<boolean>(showAIOverlays);

  const overlaysVisible = onToggleAIOverlays ? showAIOverlays : localOverlayVisible;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setBrightness(100);
    setContrast(115);
    setInvert(false);
  };

  return (
    <div className="flex flex-col bg-[#0B1519] rounded-[24px] overflow-hidden border border-[#1F3B45]/40 shadow-xl">
      {/* Top Radiological Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#0F1D24] border-b border-[#1F3B45]/40 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-medium text-white px-2.5 py-1 rounded-full bg-[#1A2E38] border border-[#22A6C0]/30">
            <span className="w-2 h-2 rounded-full bg-[#22A6C0] animate-pulse"></span>
            Panoramic OPG 2048×1024
          </span>
          <span className="text-slate-400 hidden sm:inline">Sensor: Direct Digital CMOS · 70kV / 8mA</span>
        </div>

        {/* Radiological Adjustments */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1A2E38] rounded-full p-1 border border-white/10">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] text-cyan-300">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 hover:text-white rounded-full hover:bg-white/10 transition-colors ml-1 border-l border-white/10"
              title="Reset view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle AI Overlays */}
          <button
            onClick={() => {
              if (onToggleAIOverlays) {
                onToggleAIOverlays();
              } else {
                setLocalOverlayVisible(!localOverlayVisible);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              overlaysVisible
                ? 'bg-[#22A6C0] text-white shadow-sm'
                : 'bg-[#1A2E38] text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            {overlaysVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>AI Bounding Boxes ({activeFindings.length})</span>
          </button>

          {/* Invert radiograph filter */}
          <button
            onClick={() => setInvert(!invert)}
            className={`px-2.5 py-1.5 rounded-full text-xs transition-colors border ${
              invert ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-[#1A2E38] text-slate-300 border-white/10 hover:text-white'
            }`}
            title="Invert negative/positive radiograph"
          >
            Negative
          </button>
        </div>
      </div>

      {/* Main Radiograph Canvas */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#080E12] via-[#0D181F] to-[#080E12] flex items-center justify-center min-h-[360px] md:min-h-[440px] select-none">
        {/* Subtle Radiographic Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#1f3b45_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        {/* Anatomical Panoramic Arch SVG */}
        <div
          className="w-full max-w-[840px] p-4 transition-transform duration-200"
          style={{
            transform: `scale(${zoom})`,
            filter: `brightness(${brightness}%) contrast(${contrast}%) ${invert ? 'invert(1) hue-rotate(180deg)' : ''}`,
          }}
        >
          <svg
            viewBox="0 0 760 420"
            className="w-full h-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Radiographic bone texture gradient */}
              <linearGradient id="mandibleBone" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#253A45" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#3C5E6E" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#1B2B33" stopOpacity="0.5" />
              </linearGradient>

              {/* Tooth enamel radiopacity */}
              <linearGradient id="enamelGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E2F0F7" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#AFC9D6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#6C8D9E" stopOpacity="0.7" />
              </linearGradient>

              {/* Pulp chamber radiolucency */}
              <linearGradient id="pulpChamber" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B1317" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#142127" stopOpacity="0.6" />
              </linearGradient>

              {/* Caries lesion radiolucency on #19 */}
              <radialGradient id="cariesShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#080C0E" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#1B2D36" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#AFC9D6" stopOpacity="0.1" />
              </radialGradient>
            </defs>

            {/* Background Maxilla & Mandible Anatomical Bone Base */}
            <path
              d="M 50 180 C 150 90, 610 90, 710 180 C 660 130, 100 130, 50 180 Z"
              fill="url(#mandibleBone)"
              stroke="#4E788B"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              opacity="0.4"
            />
            {/* Mandibular Canal & Lower Arch Bone Contour */}
            <path
              d="M 40 330 C 120 370, 280 395, 380 395 C 480 395, 640 370, 720 330 C 690 280, 70 280, 40 330 Z"
              fill="url(#mandibleBone)"
              stroke="#58859B"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Inferior Alveolar Nerve Canal (White dashed guide) */}
            <path
              d="M 60 320 Q 200 350, 380 350 Q 560 350, 700 320"
              fill="none"
              stroke="#22A6C0"
              strokeWidth="1.2"
              strokeDasharray="6,4"
              opacity="0.5"
            />

            {/* Midline vertical reference marker */}
            <line x1="380" y1="90" x2="380" y2="380" stroke="#22A6C0" strokeWidth="1" strokeDasharray="3,3" opacity="0.35" />

            {/* R & L Anatomical Orientation Badges */}
            <text x="35" y="45" fill="#8F9AA0" fontSize="16" fontWeight="bold" fontFamily="monospace">R (Right)</text>
            <text x="685" y="45" fill="#8F9AA0" fontSize="16" fontWeight="bold" fontFamily="monospace">L (Left)</text>

            {/* Render 32 Teeth as anatomical outlines */}
            {Object.values(TEETH_MAP).map(t => {
              const isSelected = selectedTooth === t.num;
              const hasFinding = activeFindings.some(f => f.toothNumber === t.num);
              const finding = activeFindings.find(f => f.toothNumber === t.num);
              const isUpper = t.arch === 'upper';

              // Base width & height depending on molar vs incisor
              const isMolar = [1, 2, 3, 14, 15, 16, 17, 18, 19, 30, 31, 32].includes(t.num);
              const isPremolar = [4, 5, 12, 13, 20, 21, 28, 29].includes(t.num);
              const w = isMolar ? 32 : isPremolar ? 24 : 18;
              const h = isUpper ? 60 : 66;

              return (
                <g
                  key={t.num}
                  onClick={() => {
                    if (interactive && onSelectTooth) {
                      onSelectTooth(t.num);
                    }
                    if (hasFinding && onFindingClick) {
                      onFindingClick(t.num);
                    }
                  }}
                  className={`${interactive ? 'cursor-pointer group' : ''}`}
                >
                  {/* Selected Tooth Halo */}
                  {isSelected && (
                    <ellipse
                      cx={t.x}
                      cy={t.y}
                      rx={w * 0.9}
                      ry={h * 0.65}
                      fill="none"
                      stroke="#22A6C0"
                      strokeWidth="2.5"
                      strokeDasharray="4,2"
                      className="animate-pulse"
                    />
                  )}

                  {/* Tooth Anatomical Body */}
                  {isUpper ? (
                    // Upper Tooth (Roots pointing UP, Crown pointing DOWN)
                    <g transform={`translate(${t.x - w / 2}, ${t.y - h / 2})`}>
                      {/* Roots */}
                      {isMolar ? (
                        <>
                          <path d={`M ${w * 0.2} 0 Q ${w * 0.1} ${h * 0.4}, ${w * 0.25} ${h * 0.55}`} stroke="#96B4C4" strokeWidth="3" fill="none" opacity="0.85" />
                          <path d={`M ${w * 0.8} 0 Q ${w * 0.9} ${h * 0.4}, ${w * 0.75} ${h * 0.55}`} stroke="#96B4C4" strokeWidth="3" fill="none" opacity="0.85" />
                        </>
                      ) : (
                        <path d={`M ${w * 0.5} 0 Q ${w * 0.5} ${h * 0.3}, ${w * 0.5} ${h * 0.55}`} stroke="#96B4C4" strokeWidth="3.5" fill="none" opacity="0.85" />
                      )}

                      {/* Crown */}
                      <rect
                        x="0"
                        y={h * 0.45}
                        width={w}
                        height={h * 0.5}
                        rx={isMolar ? 6 : 4}
                        fill={t.num === 19 ? 'url(#cariesShadow)' : 'url(#enamelGlow)'}
                        stroke={isSelected ? '#22A6C0' : '#C8DCE6'}
                        strokeWidth={isSelected ? '2' : '1.2'}
                        opacity="0.9"
                      />

                      {/* Internal Pulp Chamber */}
                      <rect
                        x={w * 0.3}
                        y={h * 0.52}
                        width={w * 0.4}
                        height={h * 0.3}
                        rx="2"
                        fill="url(#pulpChamber)"
                      />

                      {/* Specific Defective Restoration on #14 */}
                      {t.num === 14 && (
                        <path
                          d={`M 0 ${h * 0.5} L ${w * 0.45} ${h * 0.5} L ${w * 0.3} ${h * 0.8} L 0 ${h * 0.7} Z`}
                          fill="#FFFFFF"
                          opacity="0.95"
                          stroke="#22A6C0"
                          strokeWidth="1"
                        />
                      )}
                    </g>
                  ) : (
                    // Lower Tooth (Crown pointing UP, Roots pointing DOWN)
                    <g transform={`translate(${t.x - w / 2}, ${t.y - h / 2})`}>
                      {/* Crown */}
                      <rect
                        x="0"
                        y="0"
                        width={w}
                        height={h * 0.5}
                        rx={isMolar ? 6 : 4}
                        fill={t.num === 19 ? 'url(#cariesShadow)' : 'url(#enamelGlow)'}
                        stroke={isSelected ? '#22A6C0' : '#C8DCE6'}
                        strokeWidth={isSelected ? '2' : '1.2'}
                        opacity="0.9"
                      />

                      {/* Deep Caries Defect on #19 */}
                      {t.num === 19 && (
                        <circle
                          cx={w * 0.55}
                          cy={h * 0.22}
                          r={w * 0.3}
                          fill="#06090B"
                          stroke="#D9534F"
                          strokeWidth="1.5"
                          strokeDasharray="2,2"
                        />
                      )}

                      {/* Internal Pulp Chamber */}
                      <rect
                        x={w * 0.3}
                        y={h * 0.15}
                        width={w * 0.4}
                        height={h * 0.32}
                        rx="2"
                        fill="url(#pulpChamber)"
                      />

                      {/* Roots */}
                      {isMolar ? (
                        <>
                          <path d={`M ${w * 0.25} ${h * 0.45} Q ${w * 0.1} ${h * 0.75}, ${w * 0.2} ${h}`} stroke="#96B4C4" strokeWidth="3" fill="none" opacity="0.85" />
                          <path d={`M ${w * 0.75} ${h * 0.45} Q ${w * 0.9} ${h * 0.75}, ${w * 0.8} ${h}`} stroke="#96B4C4" strokeWidth="3" fill="none" opacity="0.85" />
                          {/* Apical Radiolucency around #19 root apex */}
                          {t.num === 19 && (
                            <ellipse cx={w * 0.2} cy={h} rx="8" ry="6" fill="#080C0E" stroke="#D9534F" strokeWidth="1" strokeDasharray="2,2" opacity="0.85" />
                          )}
                        </>
                      ) : (
                        <path d={`M ${w * 0.5} ${h * 0.45} Q ${w * 0.5} ${h * 0.75}, ${w * 0.5} ${h}`} stroke="#96B4C4" strokeWidth="3.5" fill="none" opacity="0.85" />
                      )}

                      {/* Marginal bone loss shadow on #30 */}
                      {t.num === 30 && (
                        <path
                          d={`M -4 ${h * 0.48} L ${w + 4} ${h * 0.58} L ${w + 4} ${h * 0.72} L -4 ${h * 0.65} Z`}
                          fill="#091014"
                          opacity="0.8"
                          stroke="#E2A23B"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        />
                      )}
                    </g>
                  )}

                  {/* Tooth Number Label */}
                  <text
                    x={t.x}
                    y={isUpper ? t.y - h / 2 - 8 : t.y + h / 2 + 15}
                    textAnchor="middle"
                    fill={isSelected ? '#22A6C0' : hasFinding ? '#E2A23B' : '#7A919E'}
                    fontSize="10"
                    fontWeight={isSelected || hasFinding ? 'bold' : 'normal'}
                    fontFamily="monospace"
                  >
                    #{t.num}
                  </text>

                  {/* AI Finding Highlight Box / Marker */}
                  {overlaysVisible && hasFinding && (
                    <g>
                      <rect
                        x={t.x - w * 0.75}
                        y={t.y - h * 0.6}
                        width={w * 1.5}
                        height={h * 1.2}
                        rx="6"
                        fill="none"
                        stroke={finding?.color || '#22A6C0'}
                        strokeWidth="1.8"
                        strokeDasharray={t.num === 19 ? 'none' : '4,3'}
                        className="transition-all"
                      />
                      {/* AI Confidence badge */}
                      <g transform={`translate(${t.x - 22}, ${isUpper ? t.y + h / 2 + 6 : t.y - h / 2 - 20})`}>
                        <rect
                          x="0"
                          y="0"
                          width="44"
                          height="14"
                          rx="4"
                          fill="#0F1A1F"
                          stroke={finding?.color || '#22A6C0'}
                          strokeWidth="1"
                        />
                        <text
                          x="22"
                          y="10.5"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="8.5"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {finding?.confidence}% AI
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating Quick Legend / Status in Bottom Left */}
        <div className="absolute bottom-3 left-4 flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F1D24]/85 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 pointer-events-none">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#D9534F]"></span> Caries #19
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#E2A23B]"></span> Bone Loss #30
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#22A6C0]"></span> Impacted #32
          </span>
          <span className="text-slate-500">· Click any tooth to inspect</span>
        </div>
      </div>

      {/* Detail Footer if Tooth is Selected */}
      {selectedTooth && (
        <div className="p-4 bg-[#0F1D24] border-t border-[#1F3B45]/50 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#22A6C0]/20 text-[#22A6C0] flex items-center justify-center font-bold font-mono">
              #{selectedTooth}
            </div>
            <div>
              <p className="font-semibold text-white">
                {TEETH_MAP[selectedTooth]?.name}
              </p>
              <p className="text-xs text-slate-400">
                {TEETH_MAP[selectedTooth]?.arch === 'upper' ? 'Maxillary Arch' : 'Mandibular Arch'} · Quadrant {TEETH_MAP[selectedTooth]?.quadrant}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeFindings.some(f => f.toothNumber === selectedTooth) ? (
              <div className="flex items-center gap-2 bg-[#1A2E38] px-3 py-1.5 rounded-full border border-red-500/30 text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span className="text-red-300 font-medium">
                  {activeFindings.find(f => f.toothNumber === selectedTooth)?.title}
                </span>
                <span className="font-mono text-cyan-300 bg-black/40 px-1.5 py-0.5 rounded">
                  {activeFindings.find(f => f.toothNumber === selectedTooth)?.confidence}% Conf.
                </span>
              </div>
            ) : (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F9D74]" /> No acute radiographic anomaly detected on #{selectedTooth}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
