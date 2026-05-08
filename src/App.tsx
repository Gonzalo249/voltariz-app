import React, { useState, useEffect, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useInView } from 'motion/react';
import QRCode from 'react-qr-code';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Home as HomeIcon, 
  Factory, 
  Briefcase, 
  CheckCircle2, 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  Download,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  BarChart3,
  Instagram,
  MessageCircle
} from 'lucide-react';

const Navbar = ({ activeView, setActiveView }: { activeView: string, setActiveView: (view: string) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'solutions', label: 'Soluciones' },
    { id: 'process', label: 'Proceso' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 py-4 overflow-hidden backdrop-blur-xl bg-[#02245c]/85">
      {/* Logo Background Shape - White Parallelogram */}
      <div
        className="absolute left-0 top-0 h-full bg-white/85 w-[50%] md:w-[40%] lg:w-[35%]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center cursor-pointer"
          onClick={() => setActiveView('home')}
        >
          <img
            src="/images/Logo_V.webp"
            alt="VOLTARIZ"
            className="h-14 md:h-16 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const text = document.createElement('div');
                text.className = "text-2xl font-baradig font-medium tracking-tighter text-navy uppercase";
                text.innerText = "VOLTARIZ";
                parent.appendChild(text);
              }
            }}
          />
        </motion.div>

        <div className="hidden md:flex space-x-12 items-center">
          <div className="flex space-x-10 items-center">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                whileHover={{ y: -2 }}
                onClick={() => setActiveView(link.id)}
                className={`text-sm font-semibold tracking-tight transition-colors relative px-1 py-2 cursor-pointer ${
                  activeView === link.id ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                {activeView === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-[#131d26]"
                  />
                )}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('contact')}
            className="bg-white text-charcoal px-10 py-5 text-xs font-bold tracking-[0.1em] hover:bg-gray-100 transition-all shadow-lg cursor-pointer border-r-4 border-[#131d26]"
            style={{
              clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
            }}
          >
            <span className="block">COTIZAR</span>
          </motion.button>
        </div>

        <button className="md:hidden cursor-pointer text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white backdrop-blur-2xl border-b border-charcoal/5 overflow-hidden"
          >
            <div className="flex flex-col space-y-4 p-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveView(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-medium py-2 cursor-pointer ${activeView === link.id ? 'text-charcoal' : 'text-charcoal/50'}`}
                >
                  {link.label}
                </button>
              ))}
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveView('contact');
                  setMobileMenuOpen(false);
                }}
                className="bg-charcoal text-white px-6 py-3 text-sm font-bold w-full cursor-pointer"
                style={{
                  clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
                }}
              >
                <span className="block">COTIZAR</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const LegalModal = ({ type, onClose }: { type: 'privacidad' | 'terminos', onClose: () => void }) => {
  const isPrivacidad = type === 'privacidad';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-[#0d1117] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-white font-bold text-lg uppercase tracking-widest">
            {isPrivacidad ? 'Aviso de Privacidad' : 'Términos y Condiciones'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors ml-4 shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="text-white/60 text-sm space-y-6 leading-relaxed">
          <p className="text-white/30 text-xs uppercase tracking-widest">Última actualización: mayo 2026</p>

          {isPrivacidad ? (
            <>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">1. Responsable</h3>
                <p>Voltariz Energy, con domicilio en Culiacán, Sinaloa, México, es responsable del tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).</p>
              </section>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">2. Datos personales recabados</h3>
                <p>A través del formulario de cotización recopilamos: nombre completo, correo electrónico, número de teléfono, tipo de proyecto, gasto mensual aproximado y mensaje. Estos datos son proporcionados voluntariamente por usted.</p>
              </section>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">3. Finalidades del tratamiento</h3>
                <p>Sus datos se utilizan exclusivamente para: responder su solicitud de cotización, darle seguimiento comercial sobre nuestros servicios de energía solar, y enviarle información relevante sobre proyectos Voltariz cuando usted lo solicite.</p>
              </section>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">4. Derechos ARCO</h3>
                <p>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, envíe su solicitud vía WhatsApp al 667 321 6597 o al correo de contacto disponible en este sitio.</p>
              </section>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">5. Transferencia de datos</h3>
                <p>Voltariz Energy no vende, cede ni transfiere sus datos personales a terceros sin su consentimiento, salvo obligación legal expresa.</p>
              </section>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">6. Cambios al aviso</h3>
                <p>Este aviso puede actualizarse en cualquier momento. Los cambios se publicarán en este mismo sitio con la fecha de última actualización.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">1. Uso del sitio</h3>
                <p>El sitio web de Voltariz Energy tiene carácter informativo y su único propósito es permitir que los usuarios soliciten cotizaciones de proyectos de energía solar. No realizamos ventas en línea.</p>
              </section>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">2. Cotizaciones</h3>
                <p>Las cotizaciones generadas a partir del formulario de contacto son estimaciones preliminares y no constituyen una oferta vinculante. Los precios y condiciones finales se definen en propuesta formal tras una evaluación técnica del proyecto.</p>
              </section>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">3. Propiedad intelectual</h3>
                <p>Todo el contenido de este sitio (textos, imágenes, logotipos, diseño) es propiedad de Voltariz Energy o de sus proveedores de contenido y está protegido por las leyes mexicanas de propiedad intelectual. Queda prohibida su reproducción sin autorización escrita.</p>
              </section>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">4. Limitación de responsabilidad</h3>
                <p>Voltariz Energy no se hace responsable por daños derivados del uso o imposibilidad de uso de este sitio, ni por decisiones tomadas con base en la información aquí publicada sin contar con una propuesta técnica formal.</p>
              </section>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">5. Ley aplicable</h3>
                <p>Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa se someterá a los tribunales competentes de Culiacán, Sinaloa.</p>
              </section>
              <section>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">6. Contacto</h3>
                <p>Para cualquier consulta relacionada con estos términos, contáctenos al 667 321 6597 o visítenos en Culiacán, Sinaloa.</p>
              </section>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Footer = () => {
  const [legalModal, setLegalModal] = useState<'privacidad' | 'terminos' | null>(null);
  return (
    <>
      <AnimatePresence>
        {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
      </AnimatePresence>
      <footer className="bg-charcoal border-t border-white/5 py-16 px-6 md:px-12 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="mb-6">
              <img src="/images/Logo_V.webp" alt="VOLTARIZ" className="h-12 w-auto brightness-0 invert" />
            </div>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-loose">
              © 2026 Voltariz Energy. Precision engineering for a sustainable future.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-xs font-medium text-white mb-6 uppercase tracking-widest">Contacto</h4>
            <div className="space-y-4 text-xs font-medium text-white/60">
              <p className="flex items-start gap-3">
                <MapPin size={16} className="text-white/60 shrink-0 mt-0.5" />
                <a href="https://maps.google.com/?q=Culiacán,Sinaloa,México" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Culiacán, Sinaloa
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-white/60 shrink-0" />
                <a href="tel:+526673216597" className="hover:text-white transition-colors">667 321 6597</a>
              </p>
              <p className="flex items-center gap-3">
                <MessageCircle size={16} className="text-white/60 shrink-0" />
                <a href="https://wa.me/526673216597" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
              </p>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-xs font-medium text-white mb-6 uppercase tracking-widest">Síguenos</h4>
            <div className="flex space-x-4">
              <motion.a whileHover={{ scale: 1.1, backgroundColor: '#131d26', color: '#ffffff' }} href="https://www.instagram.com/voltariz.mx?igsh=MW9wamsydWZ2eHhpeQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 transition-all cursor-pointer">
                <Instagram size={16} />
              </motion.a>
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
            <h4 className="text-xs font-medium text-white mb-2 uppercase tracking-widest">Legal</h4>
            <motion.button whileHover={{ x: 5, color: '#ffffff' }} onClick={() => setLegalModal('privacidad')} className="hover:text-white transition-colors cursor-pointer w-fit text-left">Privacidad</motion.button>
            <motion.button whileHover={{ x: 5, color: '#ffffff' }} onClick={() => setLegalModal('terminos')} className="hover:text-white transition-colors cursor-pointer w-fit text-left">Términos</motion.button>
          </div>
        </div>
      </footer>
    </>
  );
};

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwon7KAL5FL5wCiJP3VUM_5QqEtsc10rL29h9z7wV1JKNw_119F-MG_BC81W37yAZgM/exec';

const AdminView = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    const GVIZ_URL = 'https://docs.google.com/spreadsheets/d/1nZPyoz-FWocFhs-vx4J5w8rAv-3YOHi14nYQO24XkGk/gviz/tq?tqx=out:json';
    fetch(GVIZ_URL)
      .then(r => r.text())
      .then(text => {
        const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/);
        if (!match) throw new Error('formato inválido');
        const json = JSON.parse(match[1]);
        const rows = json.table?.rows || [];
        const data = rows.map((row: any) => ({
          fecha: row.c[0]?.v || '',
          name: row.c[1]?.v || '',
          email: row.c[2]?.v || '',
          phone: row.c[3]?.v || '',
          projectType: row.c[4]?.v || '',
          monthlyExpense: row.c[5]?.v || '',
          message: row.c[6]?.v || '',
        }));
        setLeads([...data].reverse());
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudieron cargar los datos.');
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: 'Leads Totales', value: loading ? '...' : String(leads.length), icon: <Mail size={20} />, trend: '' },
    { label: 'Hogar', value: loading ? '...' : String(leads.filter(l => l.projectType === 'Hogar').length), icon: <HomeIcon size={20} />, trend: '' },
    { label: 'Comercial', value: loading ? '...' : String(leads.filter(l => l.projectType === 'Comercial').length), icon: <Briefcase size={20} />, trend: '' },
    { label: 'Industrial', value: loading ? '...' : String(leads.filter(l => l.projectType === 'Industrial').length), icon: <Factory size={20} />, trend: '' },
  ];

  return (
    <div className="pt-32 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="text-4xl font-medium text-navy mb-4 tracking-tighter uppercase">Panel de Control</h1>
            <p className="text-navy/40 font-medium tracking-tight">Administración de plataforma Voltariz Energy — Datos en tiempo real.</p>
          </div>
          <div className="bg-navy text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg border border-[#131d26]/10">
            <div className="w-2 h-2 bg-[#131d26] rounded-full animate-bounce"></div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#131d26]">Sistema Activo</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(3, 36, 93, 0.08)' }}
              className="bg-navy/5 border border-navy/5 p-8 rounded-2xl transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white shadow-sm rounded-xl group-hover:scale-110 transition-transform">
                  {React.cloneElement(stat.icon as React.ReactElement, { className: 'text-navy' })}
                </div>
                {stat.trend && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>}
              </div>
              <p className="text-[10px] font-bold text-navy/40 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-medium text-[#131d26] tracking-tighter">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Recent Leads Table */}
        <div className="bg-white border border-navy/5 rounded-[40px] shadow-sm overflow-hidden">
          <div className="p-10 border-b border-navy/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
            <div>
              <h2 className="text-xl font-medium text-navy">Solicitudes Recientes</h2>
              <p className="text-xs text-navy/40 font-medium">Bandeja de entrada de clientes potenciales.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!leads.length) return;
                const headers = ['Fecha', 'Nombre', 'Email', 'Teléfono', 'Tipo de Proyecto', 'Gasto Mensual', 'Mensaje'];
                const rows = leads.map(l => [l.fecha, l.name, l.email, l.phone, l.projectType, l.monthlyExpense, l.message].map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));
                const csv = [headers.join(','), ...rows].join('\n');
                const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'leads-voltariz.csv'; a.click();
                URL.revokeObjectURL(url);
              }}
              className="text-[10px] font-bold text-navy/40 hover:text-navy transition-colors tracking-widest uppercase border border-navy/10 px-4 py-2 rounded-lg cursor-pointer"
              style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
            >
              Descargar Reporte
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 text-center text-navy/30 text-sm font-medium">Cargando datos...</div>
            ) : error ? (
              <div className="py-20 text-center text-red-400 text-sm font-medium">{error}</div>
            ) : leads.length === 0 ? (
              <div className="py-20 text-center text-navy/30 text-sm font-medium">Aún no hay solicitudes.</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-10 py-6 text-[10px] font-bold text-navy/30 uppercase tracking-widest">Cliente</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-navy/30 uppercase tracking-widest">Tipo</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-navy/30 uppercase tracking-widest">Gasto Mensual</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-navy/30 uppercase tracking-widest">Fecha</th>
                    <th className="px-10 py-6 text-[10px] font-bold text-navy/30 uppercase tracking-widest">Teléfono</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  {leads.map((lead, i) => (
                    <React.Fragment key={i}>
                      <tr
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                      >
                        <td className="px-10 py-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-navy">{lead.name}</span>
                            <span className="text-xs text-navy/40">{lead.email}</span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="text-xs font-bold text-navy/60">{lead.projectType}</span>
                        </td>
                        <td className="px-10 py-6">
                          <span className="text-xs font-medium text-navy/60">{lead.monthlyExpense}</span>
                        </td>
                        <td className="px-10 py-6">
                          <span className="text-xs font-medium text-navy/40">{lead.fecha}</span>
                        </td>
                        <td className="px-10 py-6">
                          <span className="text-xs font-medium text-navy/40">{lead.phone}</span>
                        </td>
                        <td className="px-6 py-6 text-right">
                          <motion.div animate={{ rotate: expandedRow === i ? 180 : 0 }}>
                            <ChevronDown size={16} className="text-navy/30" />
                          </motion.div>
                        </td>
                      </tr>
                      <AnimatePresence>
                        {expandedRow === i && (
                          <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td colSpan={6} className="px-10 pb-6 pt-0 bg-gray-50/50">
                              <p className="text-[10px] font-bold text-navy/30 uppercase tracking-widest mb-2">Mensaje</p>
                              <p className="text-sm text-navy/70 leading-relaxed">{lead.message || '—'}</p>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* QR Cotizar */}
        <div className="mt-16 bg-navy/5 border border-navy/5 rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="bg-white p-6 rounded-xl shadow-sm shrink-0" id="qr-cotizar">
            <QRCode value="https://voltariz.mx/?cotizar=1" size={160} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-navy/40 uppercase tracking-widest mb-2">Código QR — Cotización Directa</p>
            <h3 className="text-2xl font-medium text-navy mb-3">Lleva clientes directo al formulario</h3>
            <p className="text-navy/50 text-sm mb-6">Escanear este QR abre voltariz.mx directo en la página de cotización. Imprímelo en tarjetas, flyers o presupuestos.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const svg = document.querySelector('#qr-cotizar svg') as SVGElement;
                if (!svg) return;
                const svgData = new XMLSerializer().serializeToString(svg);
                const canvas = document.createElement('canvas');
                canvas.width = 400; canvas.height = 400;
                const ctx = canvas.getContext('2d')!;
                const img = new Image();
                const blob = new Blob([svgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                img.onload = () => {
                  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,400,400); ctx.drawImage(img,20,20,360,360);
                  URL.revokeObjectURL(url);
                  canvas.toBlob(b => { if(!b) return; const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'qr-voltariz-cotizar.png'; a.click(); });
                };
                img.src = url;
              }}
              className="text-[10px] font-bold text-navy/40 hover:text-navy transition-colors tracking-widest uppercase border border-navy/10 px-5 py-2.5 rounded-lg cursor-pointer"
              style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
            >
              Descargar PNG
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SolarOverlay = () => (
  <div className="absolute inset-0 opacity-[0.07] group-hover:opacity-[0.13] transition-opacity duration-500 pointer-events-none">
    <img src="/images/panel_background.webp" alt="" className="w-full h-full object-cover" />
  </div>
);

const HomeView = ({ setActiveView }: { setActiveView: (v: string) => void }) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { margin: '0px 0px -100% 0px' });

  const processSteps = [
    { id: '01', title: 'Analizar', content: 'Realizamos un diagnóstico técnico profundo de tus consumos históricos y las condiciones de irradiancia en tu ubicación exacta.' },
    { id: '02', title: 'Propuestas', content: 'Diseñamos múltiples escenarios de optimización personalizada, buscando el mayor ahorro financiero y eficiencia técnica.' },
    { id: '03', title: 'Ingeniería', content: 'Calculamos el sistema ideal para tu caso y te presentamos una propuesta clara con los equipos y el ahorro esperado.' },
    { id: '04', title: 'Instalación', content: 'Ejecución técnica limpia y eficiente, utilizando componentes de marcas Tier 1 y herrajes de alta resistencia climática.' },
    { id: '05', title: 'Seguimiento', content: 'Una vez instalado el sistema, te acompañamos para resolver cualquier duda y asegurarnos de que todo funcione bien.' }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Fosfo Background Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#131d26]/20 blur-[120px] rounded-full z-0 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#131d26]/10 blur-[150px] rounded-full z-0"></div>

        <div className="absolute inset-0 z-0 text-white">
          <img
            src="/images/panel_background.webp"
            alt="Solar Panels Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65"></div>
          <motion.div
            className="absolute -top-full left-0 w-full h-[200%]"
            style={{
              backgroundImage: 'repeating-linear-gradient(176deg, transparent 0px, transparent 4px, rgba(170,210,255,0.07) 4px, rgba(170,210,255,0.07) 5px)',
              backgroundSize: '18px 120px',
            }}
            animate={{ y: ['0%', '50%'] }}
            transition={{ duration: 1.1, repeat: heroInView ? Infinity : 0, ease: 'linear' }}
          />
          <motion.div
            className="absolute -top-full left-0 w-full h-[200%]"
            style={{
              backgroundImage: 'repeating-linear-gradient(176deg, transparent 0px, transparent 9px, rgba(170,210,255,0.04) 9px, rgba(170,210,255,0.04) 10px)',
              backgroundSize: '32px 180px',
            }}
            animate={{ y: ['0%', '50%'] }}
            transition={{ duration: 1.8, repeat: heroInView ? Infinity : 0, ease: 'linear' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <span className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4 block flex items-center gap-2 drop-shadow-md">
              <span className="w-2 h-2 bg-[#131d26] rounded-full"></span>
              Sostenibilidad Premium
            </span>
            <div className="w-12 h-1 bg-[#131d26] mb-8"></div>
            <h1 className="text-5xl md:text-7xl font-medium text-white mb-8 leading-[1.1] tracking-tight" style={{ textShadow: '4px 4px 0px #131d26' }}>TRANSFORMA TU CONSUMO EN INVERSIÓN</h1>
            <p className="text-lg text-white font-medium mb-12 max-w-md leading-relaxed px-5 py-4 bg-black/30 backdrop-blur-sm rounded-lg border-l-2 border-white/20">
              Lo que hoy pagas de luz, mañana puede ser tuyo. Instala paneles solares y empieza a ahorrar desde el primer mes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.button 
                whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('contact')}
                className="bg-navy text-white px-10 py-5 text-xs font-bold tracking-[0.2em] hover:bg-navy/90 transition-all shadow-xl shadow-black/20 cursor-pointer border-l-4 border-[#131d26]"
                style={{
                  clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
                }}
              >
                <span className="block">AGENDA UNA CITA</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('solutions')}
                className="border border-white text-white px-10 py-5 text-xs font-bold tracking-[0.2em] hover:bg-white hover:text-navy transition-all cursor-pointer"
                style={{
                  clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
                }}
              >
                <span className="block">EXPLORAR MÁS</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 bg-white border-b border-charcoal/5 relative overflow-hidden">
        {/* Background Decorative Pattern with Motion */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              x: [0, -40],
              y: [0, -40]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute -inset-[40px] bg-[radial-gradient(#131c27_1px,transparent_1px)] [background-size:40px_40px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <p className="text-[10px] font-medium text-navy/30 uppercase tracking-[0.4em] mb-8">Alianzas Tecnológicas de Clase Mundial</p>
          
          {/* Infinite Scroll Container */}
          <div className="relative group">
            <div className="flex overflow-hidden space-x-16 select-none">
              <motion.div 
                animate={{ x: [0, -1920] }}
                transition={{ 
                  duration: 40, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex items-center space-x-16 md:space-x-24 shrink-0"
              >
                {[
                  { src: "/images/longi.webp", alt: "Longi" },
                  { src: "/images/canadian-solar-480x245.webp", alt: "Canadian Solar" },
                  { src: "/images/fronius-480x245.webp", alt: "Fronius" },
                  { src: "/images/apsystems-480x245.webp", alt: "APSystems" },
                  { src: "/images/huwaei-480x245.webp", alt: "Huawei" },
                  { src: "/images/risen-480x245.webp", alt: "Risen" },
                ].concat([
                  { src: "/images/longi.webp", alt: "Longi" },
                  { src: "/images/canadian-solar-480x245.webp", alt: "Canadian Solar" },
                  { src: "/images/fronius-480x245.webp", alt: "Fronius" },
                  { src: "/images/apsystems-480x245.webp", alt: "APSystems" },
                  { src: "/images/huwaei-480x245.webp", alt: "Huawei" },
                  { src: "/images/risen-480x245.webp", alt: "Risen" },
                ]).map((brand, i) => (
                  <img 
                    key={i} 
                    src={brand.src} 
                    alt={brand.alt} 
                    className="h-16 md:h-24 w-auto object-contain transition-transform duration-500 hover:scale-110 drop-shadow-[0_4px_10px_rgba(0,0,0,0.08)]" 
                  />
                ))}
              </motion.div>
            </div>
            
            {/* Gradient Fades for depth removed */}
          </div>
        </div>
      </section>

      {/* Continuous White Background Sections with Diagonal Pattern */}
      <div className="relative bg-white overflow-hidden">
        {/* Background Diagonal Lines - Continuous across sections */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#131c27,#131c27_1px,transparent_1px,transparent_60px)] opacity-[0.08] pointer-events-none z-0"></div>

        {/* Intro section */}
        <section className="py-32 relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-1/2 -left-1/4 w-[500px] h-[500px] bg-[#131d26]/5 blur-[120px] rounded-full z-0"></div>
          <div className="absolute top-1/2 -right-1/4 w-[500px] h-[500px] bg-[#131d26]/5 blur-[120px] rounded-full z-0"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-24 relative z-10">
            <h2 className="text-3xl md:text-5xl font-medium text-navy mb-8 max-w-3xl mx-auto leading-tight">
              Diseñamos, desarrollamos y operamos tu sistema de energía solar
            </h2>
            <div className="w-16 h-1 bg-[#131d26]/20 mx-auto mt-8"></div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2 relative z-10"
          >
            {[
              { 
                icon: <HomeIcon size={32} />, 
                title: 'Doméstico', 
                desc: 'Residencias de alta gama con eficiencia energética total.',
                image: '/images/paneles-solare-casa-1024x768.webp'
              },
              { 
                icon: <Factory size={32} />, 
                title: 'Industrial', 
                desc: 'Infraestructura robusta para demandas a gran escala.',
                image: '/images/panel-solar-industrial.webp'
              },
              { 
                icon: <Briefcase size={32} />, 
                title: 'Comercial', 
                desc: 'Optimización de costos operativos para negocios.',
                image: '/images/panel-solar-comercial.webp'
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="bg-navy p-12 group cursor-pointer relative shadow-2xl border-white/5 border overflow-hidden"
                style={{
                  clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)"
                }}
              >
                  {/* Background Image Effect */}
                  {item.image && (
                    <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-100 transition-opacity duration-500">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-navy/80"></div>
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="mb-8 group-hover:scale-110 transition-transform text-white">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'text-white transition-colors' })}
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
                    <p className="text-white/40 mb-8 text-sm leading-relaxed max-w-[240px] border-t border-[#131d26]/30 pt-4 mt-2 group-hover:text-white/70 transition-colors">{item.desc}</p>
                    <div className="flex items-center text-[10px] font-bold text-white/60 tracking-widest uppercase transition-all group-hover:text-white">
                      SABER MÁS <ArrowRight size={12} className="ml-2" />
                    </div>
                  </div>
                </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Smart Investment */}
        <section className="py-32 overflow-hidden relative min-h-[80vh] flex items-center">
          {/* Background Decorative Pattern with Motion */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ 
                x: [0, -40],
                y: [0, -40]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute -inset-[40px] bg-[radial-gradient(#03235c_1px,transparent_1px)] [background-size:40px_40px]"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-7 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=2574&auto=format&fit=crop"
                  alt="Installation"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="absolute -bottom-8 -left-8 md:bottom-8 md:left-8 bg-charcoal p-10 text-white max-w-sm shadow-2xl backdrop-blur-md bg-opacity-95 skew-x-[-12deg]"
              >
                <div className="skew-x-[12deg]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2">Ahorro Estimado Anual</p>
                  <p className="text-4xl font-bold mb-4">$68,780 MXN</p>
                  <p className="text-[9px] text-white/40 italic">*Basado en proyectos comerciales promedio de 50kWp.</p>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-5 py-12">
              <div className="relative pl-6 mb-8 border-l-4 border-[#131d26]">
                <h2 className="text-4xl font-medium text-navy leading-tight uppercase">Inversión Inteligente</h2>
              </div>
              <p className="text-lg text-navy/60 mb-10">No solo estás comprando paneles, estás adquiriendo un activo financiero de alto rendimiento con garantías extendidas.</p>
              <ul className="space-y-6 mb-12">
                {[
                  'Retorno de inversión en menos de 4 años.',
                  'Deducibilidad fiscal inmediata del 100%.',
                  'Monitoreo en tiempo real vía app móvil.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-4">
                    <CheckCircle2 className="text-[#131d26] flex-shrink-0" size={24} />
                    <span className="text-[#131d26] font-bold">{item}</span>
                  </li>
                ))}
              </ul>
              <motion.button 
                whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('contact')}
                className="bg-navy text-white px-10 py-5 text-xs font-bold tracking-[0.15em] hover:bg-navy/90 transition-all cursor-pointer border-b-4 border-[#131d26]"
                style={{
                  clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
                }}
              >
                <span className="block">CALCULAR MI AHORRO</span>
              </motion.button>
            </div>
          </div>
        </section>

        {/* 5 Steps Process Preview */}
        <section className="py-32 relative overflow-hidden min-h-[80vh] flex items-center">
          {/* Background Decorative Pattern with Motion (Same as above to connect) */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ 
                x: [0, -40],
                y: [0, -40]
              }}
              initial={{ x: -20, y: -20 }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute -inset-[40px] bg-[radial-gradient(#03235c_1px,transparent_1px)] [background-size:40px_40px]"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            <div className="lg:col-span-4">
              <div className="relative pl-6 mb-6 border-l-4 border-[#131d26]">
                <h2 className="text-4xl font-medium text-navy leading-tight uppercase">Nuestro proceso en 5 pasos</h2>
              </div>
              <p className="text-navy/60 leading-relaxed">Metodología de ingeniería de alta precisión aplicada a cada etapa de tu transición energética.</p>
            </div>
            <div className="lg:col-span-8 flex flex-col space-y-4">
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ skewX: -12 }}
                  whileHover={{ backgroundColor: '#eef1f6', skewX: -12 }}
                  onMouseEnter={() => setExpandedStep(step.id)}
                  onMouseLeave={() => setExpandedStep(null)}
                  className="group bg-[#f4f6f9] border border-navy/10 p-8 flex flex-col transition-all cursor-pointer overflow-hidden relative z-10"
                >
                  <div className="skew-x-[12deg]">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-8">
                        <span className="text-2xl font-bold text-[#131d26] group-hover:text-[#131d26] transition-colors uppercase">{step.id}</span>
                        <div className="w-1.5 h-6 bg-[#131d26] rounded-full scale-y-0 group-hover:scale-y-100 transition-transform origin-center"></div>
                        <h4 className="text-xl font-medium text-navy uppercase tracking-tight">{step.title}</h4>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedStep === step.id ? 180 : 0 }}
                      >
                        <ChevronDown className="text-navy/20 group-hover:text-navy transition-colors" size={20} />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {expandedStep === step.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="text-navy/70 leading-relaxed pl-16 border-l-2 border-navy/10 ml-3"
                        >
                          {step.content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const SolutionsView = ({ setActiveView }: { setActiveView: (v: string) => void }) => {
  return (
    <div className="pt-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#131c27,#131c27_1px,transparent_1px,transparent_60px)] opacity-[0.08] pointer-events-none z-0"></div>
      {/* Background Fosfo Accent */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-[#131d26]/5 to-transparent z-0"></div>
      <div className="absolute top-[20%] -right-32 w-96 h-96 bg-[#131d26]/10 blur-[150px] rounded-full z-0 animate-pulse"></div>

      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-1 bg-[#131d26]"></div>
              <span className="text-xs font-bold text-navy tracking-[0.2em] uppercase block">Ingeniería de Precisión</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-medium text-navy mb-8 leading-[1.1]">Soluciones Fotovoltaicas de Alto Rendimiento.</h1>
            <p className="text-xl text-navy/50 leading-relaxed max-w-xl">
              Desarrollamos infraestructura energética basada en la eficiencia técnica y la sostenibilidad arquitectónica para transformar el consumo global.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/5] bg-charcoal/5 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/images/panel-solar-soluciones.webp"
                alt="High Performance"
                className="w-full h-full object-cover grayscale brightness-110 transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Residencial Premium */}
          <div className="md:col-span-12 lg:col-span-7 bg-navy border border-white/5 p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-white shadow-sm rounded-lg"><HomeIcon className="text-navy" size={28} /></div>
                <h2 className="text-3xl font-medium text-white">Residencial Premium</h2>
              </div>
              <p className="text-white/50 text-lg mb-12 max-w-md">
                Sistemas diseñados para integrarse estéticamente en la arquitectura moderna, maximizando el ahorro sin comprometer el diseño de la propiedad.
              </p>
              <div className="flex flex-col space-y-4 mb-12">
                {['Monitoreo Inteligente 24/7', 'Almacenamiento de Litio de Alta Densidad', 'Instalación de Bajo Impacto'].map((feat, i) => (
                  <div key={i} className="flex items-center text-sm font-bold text-white">
                    <CheckCircle2 size={18} className="text-white mr-3" /> {feat}
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-video bg-white/5 rounded-xl overflow-hidden mt-auto group">
               <img src="/images/paneles-solare-casa-1024x768.webp" className="w-full h-full object-cover grayscale brightness-110 transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>

          {/* Corporativo */}
          <div className="md:col-span-6 lg:col-span-5 bg-charcoal p-12 text-white flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <img src="/images/panel-solar-comercial.webp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="relative z-10">
              <Briefcase className="text-white/40 mb-10" size={48} />
              <h2 className="text-4xl font-medium mb-8 text-white">Corporativo</h2>
              <p className="text-white/60 text-lg mb-12">
                Optimización de costos operativos para edificios de oficinas con retornos de inversión proyectados a corto plazo.
              </p>
            </div>
            <div className="pt-12 border-t border-white/10 mt-auto relative z-10">
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Eficiencia Operativa</div>
            </div>
          </div>

          {/* Industrial Pesado */}
          <div className="md:col-span-6 lg:col-span-5 bg-charcoal p-12 flex flex-col">
            <h2 className="text-4xl font-medium text-white mb-8">Industrial Pesado</h2>
            <p className="text-white/50 text-lg mb-12">Infraestructura a gran escala que requiere independencia energética absoluta.</p>
            <div className="aspect-square bg-white/5 shadow-xl rounded-xl p-4 mt-auto overflow-hidden group">
               <img src="/images/panel-solar-industrial.webp" className="w-full h-full object-cover rounded-lg grayscale brightness-110 transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>

          {/* Tech Detail Grid */}
          <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-charcoal/5 border border-charcoal/5 p-12">
              <BarChart3 className="text-charcoal mb-8" size={32} />
              <h3 className="text-2xl font-medium text-charcoal mb-4">Análisis Térmico</h3>
              <p className="text-charcoal/50 leading-relaxed">Revisamos la orientación y condiciones de tu techo para aprovechar al máximo la luz solar.</p>
            </div>
            <div className="bg-charcoal/5 border border-charcoal/5 p-12">
              <ShieldCheck className="text-charcoal mb-8" size={32} />
              <h3 className="text-2xl font-medium text-charcoal mb-4">Respaldo Voltariz</h3>
              <p className="text-charcoal/50 leading-relaxed">Estamos contigo antes y después de la instalación para cualquier duda o seguimiento que necesites.</p>
            </div>
            <div 
              className="md:col-span-2 bg-navy text-white p-12 rounded-xl flex flex-col md:flex-row items-center justify-between text-center md:text-left shadow-xl border border-white/5"
            >
              <div>
                <h3 className="text-2xl font-medium mb-2 uppercase">Cotiza sin compromiso</h3>
                <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">Dinos cuánto pagas de luz y te decimos cuánto puedes ahorrar</p>
              </div>
              <div>
                <MessageCircle className="text-white mt-8 md:mt-0" size={32} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-charcoal/5 py-32 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="relative pl-6 mb-10 border-l-4 border-[#131d26] inline-block text-left text-charcoal">
            <h2 className="text-4xl md:text-6xl font-medium" style={{ color: '#131c27' }}>Comience su transición hoy.</h2>
          </div>
          <p className="text-lg text-charcoal/50 mb-16 leading-relaxed">Platícanos tu caso y te ayudamos a encontrar la mejor opción para ti.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <motion.button
              whileHover={{ scale: 1.05, filter: 'brightness(0.9)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView('contact')}
              className="bg-charcoal text-white px-12 py-5 text-xs font-bold tracking-[0.2em] hover:bg-charcoal/90 transition-all shadow-xl shadow-black/10 cursor-pointer"
              style={{
                clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
              }}
            >
              <span className="block">CONSULTORÍA GRATUITA</span>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProcessView = () => {
  return (
    <div className="pt-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#131c27,#131c27_1px,transparent_1px,transparent_60px)] opacity-[0.08] pointer-events-none z-0"></div>
      {/* Background Fosfo Accent */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#131d26]/5 to-transparent z-0"></div>
      <div className="absolute top-[40%] -left-32 w-[600px] h-[600px] bg-[#131d26]/5 blur-[180px] rounded-full z-0"></div>

      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-1 bg-[#131d26]"></div>
              <span className="text-xs font-bold text-navy tracking-[0.2em] uppercase block">Metodología de Precisión</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-medium text-navy mb-10 leading-tight">El Camino Hacia la Independencia Energética</h1>
            <p className="text-xl text-navy/50 leading-relaxed max-w-xl">
              Nuestra metodología de cinco etapas asegura que cada vatio sea aprovechado al máximo, combinando ingeniería de clase mundial con una ejecución impecable.
            </p>
          </div>
          <div className="lg:col-span-5 h-[500px] bg-charcoal/5 rounded-2xl overflow-hidden relative shadow-2xl group">
            <img
              src="/images/panel-solar-proceso1.webp"
              alt="Paneles solares"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </section>

      {/* Detailed Steps Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white border border-charcoal/10 p-16 relative overflow-hidden group">
          <SolarOverlay />
          <span className="absolute top-0 right-0 text-[180px] font-black text-charcoal/5 transform translate-x-4 -translate-y-12">01</span>
          <div className="relative z-10">
            <BarChart3 className="text-charcoal mb-10" size={32} />
            <h3 className="text-3xl font-medium text-charcoal mb-6">Analizar</h3>
            <p className="text-charcoal/50 text-lg leading-relaxed">
              Realizamos un diagnóstico técnico profundo de sus consumos actuales y potenciales. Utilizamos modelado de datos para entender el perfil energético único de su infraestructura.
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 bg-white border border-charcoal/10 p-16 relative overflow-hidden group">
          <SolarOverlay />
          <span className="absolute top-0 right-0 text-[180px] font-black text-charcoal/5 transform translate-x-4 -translate-y-12">02</span>
          <div className="relative z-10">
            <Download className="text-charcoal mb-10" size={32} />
            <h3 className="text-3xl font-medium text-charcoal mb-6">Propuestas</h3>
            <p className="text-charcoal/50 text-lg leading-relaxed">
               Desarrollamos múltiples escenarios de optimización financiera y técnica, priorizando el retorno de inversión y la eficiencia estructural a largo plazo.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-charcoal/10 p-16 relative overflow-hidden group">
          <SolarOverlay />
          <span className="absolute top-0 right-0 text-[180px] font-black text-charcoal/5 transform translate-x-4 -translate-y-12">03</span>
          <div className="relative z-10">
            <div className="p-3 bg-[#f4f6f9] shadow-sm inline-block rounded-lg mb-10"><Zap className="text-charcoal" size={32} /></div>
            <h3 className="text-3xl font-medium text-charcoal mb-6">Instalación</h3>
            <p className="text-charcoal/50 text-lg leading-relaxed">
              Nuestro equipo llega, instala todo limpio y seguro, y se va dejando tu sistema listo para generar desde el primer día.
            </p>
          </div>
        </div>
        <div className="lg:col-span-5 bg-white border border-charcoal/10 p-16 relative overflow-hidden group">
          <SolarOverlay />
          <span className="absolute top-0 right-0 text-[180px] font-black text-charcoal/5 transform translate-x-4 -translate-y-12">04</span>
          <div className="relative z-10">
            <div className="p-3 bg-[#f4f6f9] shadow-sm inline-block rounded-lg mb-10"><BarChart3 className="text-charcoal" size={32} /></div>
            <h3 className="text-3xl font-medium text-charcoal mb-6">Operación</h3>
            <p className="text-charcoal/50 text-lg leading-relaxed">
              Activación de monitoreo 24/7 en tiempo real. Entregamos tableros inteligentes para la gestión de generación solar continua.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Excellence Stats */}
      <section className="bg-white py-32 px-6 md:px-12 border-t border-charcoal/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
          <div className="max-w-xl">
            <div className="relative pl-6 mb-8 border-l-4 border-[#131d26] text-charcoal">
              <h2 className="text-4xl md:text-6xl font-medium" style={{ color: '#131d27' }}>Excelencia Técnica en Cada Conexión</h2>
            </div>
            <p className="text-xl text-charcoal/50 leading-relaxed">Nuestro proceso no termina con la instalación. Aseguramos que la transición energética sea fluida, segura y escalable.</p>
          </div>
          <div className="text-[10px] font-bold text-charcoal/30 tracking-[0.4em] uppercase">Voltariz Engineering Standards</div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-charcoal/10 pt-16">
          {[
            { label: '99.9%', sub: 'Eficiencia de Sistema' },
            { label: '25A', sub: 'Garantía de Potencia' },
            { label: '<14meses', sub: 'Tiempo de ROI Promedio' },
            { label: 'Tier 1', sub: 'Calidad de Componentes' }
          ].map((stat, idx) => (
            <div key={idx} className="border-l border-[#131d26] pl-10 py-4">
              <div className="text-5xl font-black text-charcoal mb-3">{stat.label}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ContactView = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Hogar',
    monthlyExpense: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError('');
    try {
      await emailjs.send(
        'service_dbb7zkh',
        'template_bkck0hs',
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          project_type: formData.projectType,
          monthly_expense: formData.monthlyExpense,
          message: formData.message,
        },
        'dN_0N4S3OoKbWfTWL'
      );
      fetch(SHEETS_URL, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          monthlyExpense: formData.monthlyExpense,
          message: formData.message,
        }),
      }).catch(() => {});
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', projectType: 'Hogar', monthlyExpense: '', message: '' });
    } catch {
      setSendError('Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#131c27,#131c27_1px,transparent_1px,transparent_60px)] opacity-[0.08] pointer-events-none z-0"></div>
      {/* Background Fosfo Accent */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#131d26]/5 blur-[150px] rounded-full z-0"></div>
      <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-[#131d26]/5 blur-[120px] rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20 pb-32 relative z-10">
        {/* Content Side */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-1 bg-[#131d26]"></div>
              <span className="inline-block py-1.5 px-4 bg-[#131d26]/5 text-[#131d26] font-medium text-[10px] tracking-[0.2em] uppercase rounded-full">Contacto Premium</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-medium text-navy mb-10 leading-[1.1] tracking-tight">Hacia la independencia energética.</h1>
            <p className="text-xl text-navy/50 leading-relaxed max-w-md">
              Diseñamos sistemas de ingeniería solar de alta precisión para arquitecturas residenciales y corporativas de vanguardia.
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-[#131d26]/5 border border-[#131d26]/10 rounded-xl"><Zap size={24} className="text-[#131d26]" /></div>
              <div>
                <h3 className="text-xl font-medium text-navy mb-2">Ingeniería Exacta</h3>
                <p className="text-[#131d26]/60">Cálculos termodinámicos optimizados para cada ubicación geográfica.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="p-4 bg-[#131d26]/5 border border-[#131d26]/10 rounded-xl"><BarChart3 size={24} className="text-[#131d26]" /></div>
              <div>
                <h3 className="text-xl font-medium text-navy mb-2">Monitoreo 24/7</h3>
                <p className="text-[#131d26]/60">Control total del almacenamiento y consumo desde nuestra plataforma.</p>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-16 border-t border-[#131d26]/10">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative group">
               <img src="/images/panel-solar-casa-formulario.webp" alt="Casa con paneles solares" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div
          className="lg:col-span-7 p-12 md:p-20 relative overflow-hidden border-2 border-[#1a3a5c]/50"
          style={{
            background: '#0b1d35',
            backgroundImage:
              'linear-gradient(rgba(120,190,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(120,190,255,0.055) 1px, transparent 1px)',
            backgroundSize: '88px 88px',
            boxShadow: '8px 8px 0px 0px #060f1c',
          }}
        >
          <div className="absolute inset-0 border border-[#2a5a8c]/20 pointer-events-none z-0"></div>
          
          <div className="max-w-xl mx-auto relative z-10">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-white text-navy rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-4xl font-medium text-white mb-6">¡Solicitud Enviada!</h2>
                <p className="text-white/40 text-lg">Un ingeniero consultor se pondrá en contacto con usted en menos de 24 horas.</p>
              </motion.div>
            ) : (
              <>
                <div className="mb-16">
                  <div className="relative pl-6 mb-4 border-l-4 border-[#131d26] text-white">
                    <h2 className="text-4xl font-medium">Solicite un Estudio Técnico</h2>
                  </div>
                  <p className="text-white/30">Complete la información para recibir una propuesta personalizada.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-bold text-white uppercase tracking-widest">Nombre Completo</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Tu nombre"
                        className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#4a9eff]/50 focus:bg-white/8 transition-colors placeholder:text-white/20 font-medium text-white"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-bold text-white uppercase tracking-widest">Correo Electrónico</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="tu@correo.com"
                        className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#4a9eff]/50 focus:bg-white/8 transition-colors placeholder:text-white/20 font-medium text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-bold text-white uppercase tracking-widest">Teléfono</label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="667 000 0000"
                        className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#4a9eff]/50 focus:bg-white/8 transition-colors placeholder:text-white/20 font-medium text-white"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-bold text-white uppercase tracking-widest">Tipo de Proyecto</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        className="bg-[#0b1d35] border border-white/10 px-4 py-3 focus:outline-none focus:border-[#4a9eff]/50 transition-colors font-medium text-white/70"
                      >
                        <option className="bg-[#0b1d35] text-white">Hogar</option>
                        <option className="bg-[#0b1d35] text-white">Comercial</option>
                        <option className="bg-[#0b1d35] text-white">Industrial</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold text-white uppercase tracking-widest">Gasto Mensual Promedio</label>
                    <div className="flex items-center bg-white/5 border border-white/10 focus-within:border-[#4a9eff]/50 transition-colors">
                      <span className="text-white/40 font-medium px-4">$</span>
                      <input
                        required
                        type="number"
                        min="0"
                        value={formData.monthlyExpense}
                        onChange={(e) => setFormData({...formData, monthlyExpense: e.target.value})}
                        placeholder="0.00"
                        className="bg-transparent w-full py-3 pr-4 focus:outline-none placeholder:text-white/20 font-medium text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-bold text-white uppercase tracking-widest">Detalles Adicionales</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Cuéntanos más sobre lo que necesitas..."
                      className="bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#4a9eff]/50 transition-colors placeholder:text-white/20 resize-none font-medium text-white"
                    ></textarea>
                  </div>

                  {sendError && (
                    <p className="text-red-400 text-sm">{sendError}</p>
                  )}
                  <div className="pt-10">
                    <motion.button
                      whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={sending}
                      className="group w-full md:w-auto bg-white text-navy px-16 py-6 font-bold text-xs tracking-[0.2em] hover:bg-gray-100 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-black/20 cursor-pointer border-r-4 border-[#131d26] disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
                      }}
                    >
                      <span className="flex items-center gap-4">
                        {sending ? 'ENVIANDO...' : 'ENVIAR SOLICITUD'}
                        {!sending && <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />}
                      </span>
                    </motion.button>
                  </div>
                </form>
              </>
            )}

            <div className="mt-24 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-3">Oficina Central</p>
                <p className="text-white font-bold text-sm">Culiacán, Sinaloa</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-3">Consultas Directas</p>
                <p className="text-white font-bold text-sm">667 321 6597</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginView = ({ onSuccess, onBack }: { onSuccess: () => void, onBack: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const h1 = process.env.ADMIN_HASH_1;
    const h2 = process.env.ADMIN_HASH_2;
    if (hash === h1 || hash === h2) {
      onSuccess();
    } else {
      setError('Contraseña incorrecta.');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f14] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="mb-10 text-center">
          <img src="/images/Logo_V.webp" alt="VOLTARIZ" className="h-10 w-auto brightness-0 invert mx-auto mb-6" />
          <p className="text-white/30 text-xs uppercase tracking-widest">Acceso restringido</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-white/10">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              autoFocus
              className="w-full bg-transparent py-3 text-white text-sm placeholder-white/20 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-white text-[#0a0f14] py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-colors disabled:opacity-40"
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>

        <button
          onClick={onBack}
          className="mt-8 w-full text-center text-white/20 text-xs uppercase tracking-widest hover:text-white/50 transition-colors"
        >
          Volver
        </button>
      </motion.div>
    </div>
  );
};

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const [activeView, setActiveView] = useState(params.get('cotizar') === '1' ? 'contact' : 'home');

  useEffect(() => {
    const handleNavToAdmin = () => setActiveView('admin');
    const handleKeyShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'CapsLock') setActiveView('login');
    };
    window.addEventListener('navToAdmin', handleNavToAdmin);
    window.addEventListener('keydown', handleKeyShortcut);
    return () => {
      window.removeEventListener('navToAdmin', handleNavToAdmin);
      window.removeEventListener('keydown', handleKeyShortcut);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#131d26] selection:text-white">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeView === 'home' && <HomeView setActiveView={setActiveView} />}
            {activeView === 'solutions' && <SolutionsView setActiveView={setActiveView} />}
            {activeView === 'process' && <ProcessView />}
            {activeView === 'contact' && <ContactView />}
            {activeView === 'login' && <LoginView onSuccess={() => setActiveView('admin')} onBack={() => setActiveView('home')} />}
            {activeView === 'admin' && <AdminView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {activeView !== 'login' && activeView !== 'admin' && (
        <motion.a
          href="https://wa.me/526673216597"
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-black/20"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>
      )}
    </div>
  );
}

