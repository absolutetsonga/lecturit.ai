import { Hero } from '@/app/components/Hero';
import { PrimaryFeatures } from '@/app/components/PrimaryFeatures';
import { SecondaryFeatures } from './components/SecondaryFeatures';
import { CTA } from './components/CTA';

export default function Home() {
    return (
        <div>
            <Hero />
            <PrimaryFeatures />
            <SecondaryFeatures />
            <CTA/>
        </div>
    );
}
