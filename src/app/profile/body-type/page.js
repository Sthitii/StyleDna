"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import triangle from "@/assets/triangle.png";
import inverted from "@/assets/inverted.png";
import oval from "@/assets/oval.png";
import rectangle from "@/assets/rectangle.png";
import hourglass from "@/assets/hourglass.png";
import bodymeasure from "@/assets/body-measure.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveBodyType } from "@/lib/firebase/database";

const BodyTypePage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [measurements, setMeasurements] = useState({
    bust: "",
    waist: "",
    highHip: "",
    hip: "",
  });

  const bodyTypes = [
    {
      type: "hourglass",
      name: "Hourglass",
      description:
        "Balanced bust and hip measurements with a narrower waist. Often considered curvy.",
      image: hourglass,
    },
    {
      type: "pear",
      name: "Pear",
      description:
        "Hips are wider than shoulders and bust, with a defined waist fuller hips and thighs.",
      image: triangle,
    },
    {
      type: "rectangle",
      name: "Rectangle",
      description:
        "Bust, waist, and hip measurements are fairly uniform, minimal curves, athletic and straight silhouette.",
      image: rectangle,
    },
    {
      type: "inverted triangle",
      name: "Inverted Triangle",
      description:
        "Broader shoulders and bust compared to hips, tapered lower body with a strong upper body appearance",
      image: inverted,
    },
    {
      type: "oval",
      name: "Oval",
      description:
        "Full figure with a rounded appearance, often with a less defined waist, Broader torso, undefined waist, and slender legs,",
      image: oval,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedType) {
      alert("Please select a body type");
      return;
    }
    setLoading(true);
    const { error } = await saveBodyType(selectedType);
    setLoading(false);

    if (error) {
      alert(error);
      return;
    }

    router.push("/");
  };
  const handleBodyTypeMeasure = async (e) => {
    e.preventDefault;

    const { bust, waist, highHip, hip } = measurements;

    const bustValue = parseFloat(bust);
    const waistValue = parseFloat(waist);
    const highHipValue = parseFloat(highHip);
    const hipValue = parseFloat(hip);

    if (
      isNaN(bustValue) ||
      isNaN(waistValue) ||
      isNaN(highHipValue) ||
      isNaN(hipValue)
    ) {
      alert("Please enter valid numbers for all measurements.");
      return;
    }
    // Logic for determining body type
    let result = "";
    console.log(bustValue, hipValue, waistValue, highHipValue, "highHipValue");
    if (
      Math.abs(bustValue - hipValue) <= 2 &&
      waistValue < bustValue &&
      waistValue < hipValue
    ) {
      result = "hourglass";
    } else if (
      hipValue > bustValue &&
      waistValue < bustValue &&
      waistValue < hipValue
    ) {
      result = "pear";
    } else if (
      bustValue > hipValue &&
      waistValue < bustValue &&
      waistValue < hipValue
    ) {
      result = "inverted triangle";
    } else if (
      Math.abs(highHipValue - hipValue) <= 2 &&
      Math.abs(bustValue - hipValue) <= 2 &&
      Math.abs(waistValue - highHipValue) > 2
    ) {
      result = "rectangle";
    } else {
      result = "triangle";
    }
    if (result.length > 0) {
      setCalculated(true);
    }

    setSelectedType(result);
    setShowMeasurements(false);

    const bodyTypeCard = document.querySelector(`[data-bodytype="${result}"]`);
    if (bodyTypeCard) {
      bodyTypeCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-white py-4 px-4">
      <Link href="/" className="text-2xl font-serif">
        STYLEDNA
      </Link>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light mb-4">FIND YOUR BODY TYPE</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Understanding your body type helps us recommend styles that will
            look amazing on you. Choose your body type from the options below,
            or provide your measurements for a personalized analysis.
          </p>
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bodyTypes.map((type) => (
              <motion.div
                key={type.type}
                data-bodytype={type.type}
                whileHover={{ scale: 1.02 }}
                className={`border-2 p-4 cursor-pointer transition-all duration-300 ${
                  selectedType === type.type
                    ? "border-black bg-black/5 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedType(type.type)}
              >
                <div className="flex items-center justify-center relative h-80 mb-4">
                  <Image
                    src={type.image}
                    alt={type.name}
                    className="object-scale-down w-full h-full"
                  />
                </div>
                <h3
                  className={`text-lg font-medium mb-2 ${
                    selectedType === type.type ? "text-black" : "text-gray-800"
                  }`}
                >
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600">{type.description}</p>
                {selectedType === type.type && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <p className="text-sm font-medium text-black">
                      ✓ Your {calculated ? `calculated` : ``} body type
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {selectedType && !showMeasurements && (
          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-12 py-3 hover:bg-gray-800 transition-colors"
            >
              SAVE MY BODY TYPE
            </button>
          </div>
        )}

        <div className="text-center my-8">
          <button
            onClick={() => setShowMeasurements(!showMeasurements)}
            className="text-gray-600 hover:text-black transition-colors flex items-center justify-center mx-auto"
          >
            <Info className="w-4 h-4 mr-2" />
            Not sure? Use measurements instead
          </button>
        </div>

        {showMeasurements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg"
          >
            <h2 className="text-2xl font-light mb-6 text-center">
              Enter Your Measurements
            </h2>

            <div className="mb-8">
              <div className="relative h-48 mb-4">
                <Image
                  src={bodymeasure}
                  alt="Measurement guide"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Use a measuring tape to take accurate measurements. Refer to the
                guide above.
              </p>
            </div>

            <form onSubmit={handleBodyTypeMeasure} className="space-y-6">
              {Object.entries({
                bust: "Bust Size (inches)",
                waist: "Waist Size (inches)",
                highHip: "High Hip Size (inches)",
                hip: "Hip Size (inches)",
              }).map(([key, label]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="number"
                    value={measurements[key]}
                    onChange={(e) =>
                      setMeasurements((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="w-full border-b border-gray-200 py-2 focus:border-black focus:ring-0"
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
              >
                ANALYZE MY BODY TYPE
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BodyTypePage;
