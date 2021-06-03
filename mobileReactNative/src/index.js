import React, { useEffect, useState } from "react"
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native"

import api from "./services/api"

export default function App() {
   const [projects, setProjects] = useState([])

   useEffect(() => {
      api.get("projects").then(response => {
         console.log(response.data)
         setProjects(response.data)
      })   
   }, [])

   async function handleAddProject() {
      const response = await api.post("projects", {
         title: `Novo Projeto ${Date.now()}`,
         owner: "PitzTech" 
      })

      const newProject = response.data

      setProjects([...projects, newProject])
   }

   return (
      <> 
         <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
         
         <SafeAreaView style={styles.container}>
            <FlatList 
               data={projects}
               keyExtractor={project => project.id}
               renderItem={({ item }) => (
                  <Text style={styles.project}>{item.title}</Text>
               )}
            />

            <TouchableOpacity 
               activeOpacity={0.6} 
               style={styles.button} 
               onPress={handleAddProject}
            >
               <Text style={styles.buttonText}>Adicionar Projeto</Text>
            </TouchableOpacity>
         </SafeAreaView>
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#7159c1",
   },

   project: {
      color: "#FFF",
      fontSize: 30,
   },

   button: {
      backgroundColor: "#FFF",
      margin: 20,
      height: 50,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center"
   },

   buttonText: {
      fontWeight: "bold",
      fontSize: 16
   }
})

