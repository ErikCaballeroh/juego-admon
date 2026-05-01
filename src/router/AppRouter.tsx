import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import GameShellLayout from '../layouts/GameShellLayout'
import GameScenePage from '../pages/GameScenePage'
import LevelSelectPage from '../pages/LevelSelectPage'
import MainMenuPage from '../pages/MainMenuPage'
import StudyGuidePage from '../pages/StudyGuidePage'
import NotFoundPage from '../pages/NotFoundPage'
import ProfilePage from '../pages/ProfilePage'
import SettingsPage from '../pages/SettingsPage'
import { ROUTES } from './paths'

function AnimatedRouteTree() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<GameShellLayout />}>
                    <Route path={ROUTES.mainMenu} element={<MainMenuPage />} />
                    <Route path={ROUTES.profile} element={<ProfilePage />} />
                    <Route path={ROUTES.studyGuide} element={<StudyGuidePage />} />
                    <Route path={ROUTES.levelSelect} element={<LevelSelectPage />} />
                    <Route path={ROUTES.settings} element={<SettingsPage />} />
                    <Route path={ROUTES.gameScene} element={<GameScenePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AnimatedRouteTree />
        </BrowserRouter>
    )
}