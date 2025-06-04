import Link from "next/link"
import { Heart, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-emerald-500" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">MediRecord</span>
            </div>
            <p className="text-slate-600 dark:text-gray-300 mb-4">
              Système d'information sanitaire personnalisé pour une meilleure communication entre professionnels de
              santé et patients.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-gray-300">
                <Mail className="h-4 w-4" />
                <span>contact@medirecord.sn</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+221 77 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Dakar, Sénégal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-600 dark:text-gray-300">© 2024 MediRecord. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
