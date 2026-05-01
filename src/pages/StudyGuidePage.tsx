import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import { LEVELS } from '../data/levels'
import { buildGameScenePath, ROUTES } from '../router/paths'

export default function StudyGuidePage() {
    const [expandedLevel, setExpandedLevel] = useState<string | null>(null)

    return (
        <PageTransition className="min-h-screen px-6 py-8">
            <section className="mx-auto max-w-4xl">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Guía de Estudio Completa</h1>
                        <p className="mt-2 text-slate-400">Domina todos los conceptos antes de enfrentarte a cada misión</p>
                    </div>
                    <Link to={ROUTES.levelSelect} className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-700">
                        Volver a Niveles
                    </Link>
                </header>

                <div className="space-y-6">
                    {LEVELS.map((lvl) => (
                        <article
                            key={lvl.id}
                            className="overflow-hidden rounded-xl border border-slate-700/40 bg-slate-800/30 transition"
                        >
                            <button
                                onClick={() =>
                                    setExpandedLevel(expandedLevel === lvl.id ? null : lvl.id)
                                }
                                className="w-full px-6 py-4 text-left transition hover:bg-slate-800/50"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold">{lvl.name}</h2>
                                        <p className="mt-1 text-sm text-slate-400">{lvl.description}</p>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0 items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-sm font-medium">{lvl.difficulty}</div>
                                            <div className="text-xs text-slate-400">{lvl.estimatedMinutes} min</div>
                                        </div>
                                        <div className="text-2xl transition-transform">
                                            {expandedLevel === lvl.id ? '▼' : '▶'}
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {expandedLevel === lvl.id && (
                                <div className="border-t border-slate-700/40 bg-slate-900/20 px-6 py-4">
                                    {lvl.questions ? (
                                        <div className="space-y-6">
                                            {Object.entries(lvl.questions).map(
                                                ([qKey, question], idx) => (
                                                    <div
                                                        key={qKey}
                                                        className="rounded-lg border border-slate-700/30 bg-slate-800/20 p-4"
                                                    >
                                                        <div className="mb-3">
                                                            <span className="text-xs font-bold text-cyan-400">
                                                                PREGUNTA {idx + 1}
                                                            </span>
                                                            <h3 className="mt-1 text-base font-semibold">
                                                                {question.text}
                                                            </h3>
                                                        </div>

                                                        <div className="space-y-2">
                                                            {question.options.map((option, optIdx) => (
                                                                <div
                                                                    key={optIdx}
                                                                    className={`rounded px-3 py-2 text-sm transition ${optIdx === question.correctIndex
                                                                            ? 'border border-green-500/50 bg-green-500/10 text-green-200'
                                                                            : 'border border-slate-700/30 bg-slate-700/20 text-slate-300'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-start gap-2">
                                                                        <span className="font-bold text-slate-400">
                                                                            {String.fromCharCode(
                                                                                65 + optIdx
                                                                            )}
                                                                        </span>
                                                                        <span>{option}</span>
                                                                        {optIdx ===
                                                                            question.correctIndex && (
                                                                                <span className="ml-auto text-xs font-bold text-green-400">
                                                                                    ✓ CORRECTA
                                                                                </span>
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-slate-400">
                                            Sin preguntas disponibles
                                        </p>
                                    )}

                                    <div className="mt-6 flex gap-3 border-t border-slate-700/40 pt-4">
                                        <Link
                                            to={buildGameScenePath(lvl.id)}
                                            className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300"
                                        >
                                            Ir al Nivel
                                        </Link>
                                        <button
                                            onClick={() => setExpandedLevel(null)}
                                            className="rounded-md border border-slate-600 px-4 py-2 text-sm font-medium hover:bg-slate-700"
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </PageTransition>
    )
}
