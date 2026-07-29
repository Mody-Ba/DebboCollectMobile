import { View, Text } from "react-native";
import * as Progress from "react-native-progress";

type Props = {
    questions: any[];
    regions: any[];
};

export default function RegionTable({questions,}: Props) {
    console.log("QUESTIONS =", questions);

    return (

        <View
            style={{
                backgroundColor: "white",
                borderRadius: 18,
                padding: 20,
                marginTop: 25,
                elevation: 3,
            }}
        >

            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                Statistiques du formulaire
            </Text>

            <Text>
                {questions.length}
            </Text>

            {questions
                .filter(
                    (question: any) =>
                        (
                            question.type === "CHOIX_UNIQUE" ||
                            question.type === "CHOIX_MULTIPLE"
                        ) &&
                        question.statistique !== "REGION"
                )
                .map((question: any) => (

                    <View
                        key={question.champId}
                        style={{
                            marginBottom: 25,
                        }}
                    >

                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 17,
                                marginBottom: 12,
                            }}
                        >
                            {question.question}
                        </Text>

                        {(question.reponses ?? []).map((rep: any, index: number) => {

                            const total = question.reponses.reduce(
                                (s: number, r: any) => s + r.nombre,
                                0
                            );

                            const pourcentage =
                                total === 0
                                    ? 0
                                    : rep.nombre / total;

                            return (

                                <View
                                    key={index}
                                    style={{
                                        marginBottom: 12,
                                    }}
                                >

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginBottom: 5,
                                        }}
                                    >

                                        <Text>{rep.valeur}</Text>

                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {rep.nombre}
                                        </Text>

                                    </View>

                                    <Progress.Bar
                                        progress={pourcentage}
                                        width={null}
                                        height={10}
                                        borderWidth={0}
                                        color="#16A34A"
                                        unfilledColor="#E5E7EB"
                                    />

                                </View>

                            );

                        })}

                    </View>

                ))}

        </View>

    );

}